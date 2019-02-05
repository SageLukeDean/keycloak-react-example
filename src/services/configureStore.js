import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import { enhancers, middlewares, rootReducer, rootSaga } from 'ducks';
// import Logger from 'services/logger';

// const { log } = Logger(module.id);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(),
  composeWithDevTools(
    ...enhancers,
    applyMiddleware(...middlewares, sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
