import Logger from 'services/logger';
import { handleActions } from 'redux-actions';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import {
  receiveKeycloak,
  requestAuth as authorizeAction,
  requestLogout as logoutAction,
} from './actions';
import { selectKeycloak } from './selectors';
import initializeKeycloak from './keycloakWrapper';
import logout from './logout';

const { log } = Logger(module.id);

// action creators
export const requestAuth = authorizeAction;
export const requestLogout = logoutAction;

// reducers
export const reducers = handleActions(
  // reducerMap
  {
    [receiveKeycloak](state, action) {
      log('Processing receiveKeycloak');
      return {
        ...state,
        keycloak: action.payload,
        error: action.error,
      };
    },
  },
  // The default state
  {
    keycloak: undefined,
  }
);

// Fetch keycloak, initialize if necessary.
export function* _getAuth() {
  log('getAuth');
  const keycloak = yield select(selectKeycloak);
  if (!keycloak) {
    yield call(initializeKeycloak);
  }
}

export function* _watch() {
  yield takeLatest(requestAuth, _getAuth);
  yield takeLatest(requestLogout, logout);
}

export function* sagas() {
  yield all([_watch()]);
}
