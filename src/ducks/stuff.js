//  This does not actually work.  It's just an example of what a duck
//  that's responsible for gettting "stuff" from an API server would
//  look like

// /* global __API_PATH__ */

import { createAction, handleActions } from 'redux-actions';
// import { all, call, put, takeLatest } from 'redux-saga/effects';
import { all, put, takeLatest } from 'redux-saga/effects';
import Logger from 'services/logger';
import namespacer from 'services/namespacer';
// import request from 'services/httpClient';

const namespace = namespacer('STUFF');
const { log } = Logger(module.id);

// action creators
export const requestStuff = createAction(namespace('REQUEST'));
export const receiveStuff = createAction(namespace('RECEIVE'));

// reducers
export const reducers = handleActions(
  // reducerMap
  {
    [receiveStuff](state, action) {
      log('Receiving stuff');
      return {
        ...state,
        stuff: action.payload,
      };
    },
    // more reducers
  },
  // The default state
  {
    stuff: undefined,
  }
);

// sagas
export function* requestStuffSaga() {
  log('requesting stuff');
  // const url = `${__API_PATH__}stuff`;
  let payload;
  try {
    // TODO
    // payload = yield call(request, url);
    payload = { key: 'value' };
  } catch (err) {
    log('error requesting stuff', err);
    payload = err;
  }
  yield put(receiveStuff(payload));
}

function* watch() {
  yield takeLatest(requestStuff, requestStuffSaga);
}

export function* sagas() {
  yield all([watch()]);
}
