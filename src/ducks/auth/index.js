import Logger from 'services/logger';
import { handleActions } from 'redux-actions';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import { requestAuth as authorizeAction, receiveKeycloak } from './actions';
import { selectKeycloak } from './selectors';
import initializeKeycloak from './keycloakWrapper';

const { log } = Logger(module.id);

// action creators
export const requestAuth = authorizeAction;

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
}

export function* sagas() {
  yield all([_watch()]);
}
