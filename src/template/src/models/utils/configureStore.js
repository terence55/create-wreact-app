import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import thunkMiddleware from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import reducers from './combineStore';

let loggerMiddleware;
if (process.env.NODE_ENV !== 'production') {
  const reduxLogger = require('redux-logger');
  loggerMiddleware = reduxLogger.createLogger({
    stateTransformer: state =>
      state.toJSON()
  });
}

const enableReduxDevtools = false;

let createStoreWithMiddleware;
if (process.env.NODE_ENV !== 'production') {
  if (enableReduxDevtools) {
    createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware, loggerMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__())(createStore); // eslint-disable-line no-underscore-dangle
  } else {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
  }
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

function createAppStore() {
  const reducer = combineReducers(reducers);
  const state = Immutable.fromJS({});
  const store = reducer(state);
  return createStoreWithMiddleware(enableBatching(reducer), store);
}

const sharedStore = createAppStore();

export default sharedStore;
