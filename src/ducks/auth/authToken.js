import Logger from 'services/logger';
import { call, put, select } from 'redux-saga/effects';
import { receiveKeycloak } from './actions';
import { selectKeycloak, selectAuthToken } from './selectors';

const { log } = Logger(module.id);

// Get an auth token that should be fresh enough to use.
export default function* getAuthToken() {
  log('getAuthToken');
  const keycloak = yield select(selectKeycloak);
  if (!keycloak) {
    return 'NONE'; // Should only occur when developing without keycloak
  }
  // If our session is still valid but our access token is about to die, get a fresh one.
  // https://www.keycloak.org/docs/latest/securing_apps/index.html#updatetoken-minvalidity
  const withinSecondsOfDeath = 30;
  const refreshed = yield call(keycloak.updateToken, withinSecondsOfDeath);
  // Keep redux informed about keycloak changes.
  if (refreshed) {
    yield put(receiveKeycloak(keycloak));
  }
  // Select the token from redux, so we're all on the same page.
  const authToken = yield select(selectAuthToken);
  return authToken;
}
