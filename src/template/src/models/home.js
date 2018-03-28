import { batchActions } from 'redux-batched-actions';
import { CommonActionTypes } from './utils/createReducer';
import { createSimpleReducers, createStateSwitchReducers } from './utils/reducerUtils';
import { getJsonData } from '../utils/service';
import uris from '../common/uri';

const namespace = 'home';

const actionTypes = {
  SHOW_TIME: `${namespace}/SHOW_TIME`,
  HIDE_TIME: `${namespace}/HIDE_TIME`,
  START_LOADING: `${namespace}/START_LOADING`,
  STOP_LOADING: `${namespace}/STOP_LOADING`,
  SET_REQUEST_DATA: `${namespace}/SET_REQUEST_DATA`
};

export default {
  namespace: namespace,
  state: {
    time: null,
    loading: false,
    requestData: null
  },
  actions: {
    showTime(input) {
      return {
        type: actionTypes.SHOW_TIME,
        payload: input || new Date().toString()
      };
    },
    hideTime() {
      return {
        type: actionTypes.HIDE_TIME
      };
    },
    clearHome() {
      return {
        type: CommonActionTypes.CLEAR_STORE + namespace
      };
    },
    clearAll() {
      return {
        type: CommonActionTypes.CLEAR_STORE
      };
    },
    asyncPull() {
      return (dispatch) => {
        dispatch({
          type: actionTypes.START_LOADING
        });
        getJsonData(uris.doubanInTheaters())
          .then((data) => {
            dispatch(batchActions([
              {
                type: actionTypes.SET_REQUEST_DATA,
                payload: data
              }, {
                type: actionTypes.STOP_LOADING
              }
            ]));
          })
          .catch((err) => {
            dispatch(batchActions([
              {
                type: actionTypes.SET_REQUEST_DATA,
                payload: `Error!!!, detail = ${err}`
              }, {
                type: actionTypes.STOP_LOADING
              }
            ]));
          });
      };
    }
  },
  reducers: {
    ...createSimpleReducers(actionTypes.SHOW_TIME, 'time'),
    ...createSimpleReducers(actionTypes.HIDE_TIME, 'time', null),
    ...createStateSwitchReducers(actionTypes.START_LOADING, actionTypes.STOP_LOADING, 'loading'),
    ...createSimpleReducers(actionTypes.SET_REQUEST_DATA, 'requestData')
  }
};
