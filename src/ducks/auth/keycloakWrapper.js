// /* global __API_PATH__ */

import Logger from 'services/logger';
import Keycloak from 'keycloak-js';
// import Uri from 'urijs';
import { call, put } from 'redux-saga/effects';
// import send from 'services/httpClient';
import { receiveKeycloak } from './actions';

const { log } = Logger(module.id);

let keycloak;

const keycloakInitConfig = {
  // onLoad: 'login-required', // I would use this, but it throws errors on page refreshes.
  promiseType: 'native', // Promises aren't really promises without this!
  checkLoginIframe: false, // This has not been a helpful feature, so I disable it.
};

// I like keeping the keycloak config on a public API endpoint where anyone
// can fetch it.  This way I can change it by just updating the API server.
// I don't have to rebuild or redeploy any client code.
// It goes like this:
//
// export function* _getAuthConfig() {
//   log('Fetching authconfig');
//   const url = Uri(__API_PATH__)
//    .segment('authconfig')
//    .toString();
//   const payload = yield call(send, url);
//   return payload;
// };
//
// For this example, I don't have a server, so I'll just hardcode it
// right here instead:
export function _getAuthConfig() {
  return {
    url: 'http://localhost:8080/auth',
    realm: 'my-realm',
    clientId: 'my-client',
  };
}

// Disabling no-param-reassign here because assigning the callbacks this way is
// the only way I know to make them testable.  LHD
/* eslint-disable no-param-reassign */
export function _setupCallbacks(kc) {
  kc.onReady = authenticated => {
    log(`onReady authenticated=${authenticated}`);
  };
  kc.onAuthSuccess = () => {
    log('onAuthSuccess');
    // Don't bother trying to update redux here.  This callback doesn't wait.
    // We will update redux after the init promise is resolved instead.
  };
  kc.onAuthError = errorData => {
    // errorData could be { error: error, error_description: oauth.error_description } or sometimes nothing at all.
    log('onAuthError', errorData);
    // Tell redux
    put(receiveKeycloak(kc));
  };
  kc.onAuthRefreshSuccess = () => {
    log('onAuthRefreshSuccess');
    // Tell redux about the new tokens
    put(receiveKeycloak(kc));
  };
  kc.onAuthRefreshError = () => {
    log('onAuthRefreshError');
    // Tell redux
    put(receiveKeycloak(kc));
  };
  kc.onAuthLogout = () => {
    log('onAuthLogout');
    // Send them to the login page
    kc.login(); // This redirects the browser to keycloak
  };
  kc.onTokenExpired = () => {
    log('onTokenExpired');
    // This will happen when the access token reaches the time it's supposed to die.
    // The does not mean the session is dead.  Access tokens should be short-lived.
    // We should use the refresh token to get a new access token after this point.
  };
}
/* eslint-enable no-param-reassign */

// Initialize keycloak
export default function* initializeKeycloak() {
  log('initializing keycloak');

  // Get the keycloak configuration
  let keycloakConfig;
  try {
    keycloakConfig = yield call(_getAuthConfig);
  } catch (err) {
    log('error fetching authconfig', err);
    yield put(receiveKeycloak(err));
    return;
  }

  // If the server returned { noauth: true }, it means we're developing without keycloak.
  if (keycloakConfig.noauth) {
    log(
      'Authconfig says not to use keycloak.  Not initializing keycloak after all.'
    );

    // TODO put actions that you want to take immediately after successful
    // authentication.
    // yield put(restoreState());
    return;
  }

  keycloak = yield call(Keycloak, keycloakConfig);
  yield call(_setupCallbacks, keycloak);
  yield call(keycloak.init, keycloakInitConfig);

  // This block replicates what init with { onLoad: 'login-required' } would
  // do, only with generators and without crashing on page reloads.
  if (!keycloak.authenticated) {
    log('keycloak authenticating');
    // If you are reloading the page while the browser's application storage says
    // that you should be authenticated, you will now see a warning similar to
    // this in the Javascript console:
    // "WebSocket connection to 'xxx' failed: WebSocket is closed before the connection is established."
    // The page will reload again, keycloak will figure out what's going on, and you
    // won't re-enter this block after the page reloads unless you truly need to.
    yield call(keycloak.login); // This redirects the browser to keycloak
    return; // Ensure that this saga stops here.  Necessary for unit testing.
  }

  // We have successfully logged in or refreshed the page.  Save the keycloak
  // state to redux.  Don't depend on async callbacks to do this.  Make sure we
  // do it now before trying to restore state.
  yield put(receiveKeycloak(keycloak));

  // TODO put actions that you want to take immediately after successful
  // authentication.
  // yield put(restoreState());
}
