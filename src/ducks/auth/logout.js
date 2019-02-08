import Logger from 'services/logger';
import { call, put, select } from 'redux-saga/effects';
import { receiveKeycloak } from './actions';
import { selectKeycloak } from './selectors';

const { log } = Logger(module.id);

// Log out
export default function* logout() {
  log('logout');
  const keycloak = yield select(selectKeycloak);
  if (keycloak) {
    yield call(keycloak.logout);
    // Keep redux informed about keycloak changes.
    yield put(receiveKeycloak(keycloak));
  }
}
