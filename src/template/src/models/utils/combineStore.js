import Immutable from 'immutable';
import createReducer from './createReducer';

const context = require.context('../', false, /\.js$/);
const keys = context.keys().filter(item => (item !== './index.js'));
const stores = [];
for (let i = 0; i < keys.length; i++) {
  stores.push(context(keys[i]));
}

const rootReducer = {};
stores.forEach((store) => {
  const model = store.default || store;
  const reducer = createReducer(Immutable.fromJS(model.state), model.reducers, model.namespace);
  if (reducer.reducerName) {
    rootReducer[reducer.reducerName] = reducer;
  }
});

export default rootReducer;
