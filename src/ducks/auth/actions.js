import { createAction } from 'redux-actions';
import namespacer from 'services/namespacer';

const namespace = namespacer('AUTH');

// action creators
export const requestAuth = createAction(namespace('REQUEST_AUTH'));
export const receiveKeycloak = createAction(namespace('RECEIVE_KEYCLOAK'));
export const requestLogout = createAction(namespace('REQUEST_LOGOUT'));
