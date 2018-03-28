import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

export const CommonActionTypes = {
  CLEAR_STORE: 'common/CLEAR_STORE_',
  SET_VIA_PATH: 'common/SET_VIA_PATH_'
};

export default function createEnhancedReducer(initialState, handlers, reducerName) {
  const extraHandlers = {
    [CommonActionTypes.CLEAR_STORE]: state =>
      state.merge(initialState.toJSON()),
    [CommonActionTypes.CLEAR_STORE + reducerName]: state =>
      state.merge(initialState.toJSON()),
    [CommonActionTypes.SET_VIA_PATH + reducerName]: (state, action) => {
      if (action.path && action.path.length > 0) {
        return state.setIn(action.path, Immutable.fromJS(action.data));
      }
      return state.merge(action.data);
    }
  };
  const enhancedReducer = createReducer(initialState, Object.assign({}, handlers, extraHandlers));
  enhancedReducer.reducerName = reducerName;
  return enhancedReducer;
}
