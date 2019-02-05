import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { reducers as auth, sagas as authSagas } from './auth';
import { reducers as stuff, sagas as stuffSagas } from './stuff';

export function* rootSaga() {
  yield all([authSagas(), stuffSagas()]);
}

export const rootReducer = () =>
  combineReducers({
    auth,
    stuff,
  });

export const middlewares = [];

export const enhancers = [];
