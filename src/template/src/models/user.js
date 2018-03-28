import { batchActions } from 'redux-batched-actions';
import { createSimpleReducers, createStateSwitchReducers } from './utils/reducerUtils';
import { getJsonData } from '../utils/service';
import uris from '../common/uri';

const namespace = 'user';

const actionTypes = {
  SET_USER_LIST: `${namespace}/SET_USER_LIST`,
  SET_USER: `${namespace}/SET_USER`,
  START_LOADING: `${namespace}/START_LOADING`,
  STOP_LOADING: `${namespace}/STOP_LOADING`
};

export default {
  namespace: namespace,
  state: {
    userList: null,
    user: null,
    loading: false
  },
  actions: {
    getUserList() {
      return (dispatch) => {
        dispatch({
          type: actionTypes.START_LOADING
        });
        getJsonData(uris.getUserList())
          .then((data) => {
            dispatch(batchActions([
              {
                type: actionTypes.SET_USER_LIST,
                payload: data
              }, {
                type: actionTypes.STOP_LOADING
              }
            ]));
          })
          .catch((err) => {
            dispatch(batchActions([
              {
                type: actionTypes.SET_USER,
                payload: `Error!!!, detail = ${err}`
              }, {
                type: actionTypes.STOP_LOADING
              }
            ]));
          });
      };
    },
    getUser() {
      return (dispatch) => {
        dispatch({
          type: actionTypes.START_LOADING
        });
        getJsonData(uris.getUser(new Date().getMilliseconds()))
          .then((data) => {
            dispatch(batchActions([
              {
                type: actionTypes.SET_USER,
                payload: data
              }, {
                type: actionTypes.STOP_LOADING
              }
            ]));
          })
          .catch((err) => {
            dispatch(batchActions([
              {
                type: actionTypes.SET_USER,
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
    ...createSimpleReducers(actionTypes.SET_USER_LIST, 'userList'),
    ...createSimpleReducers(actionTypes.SET_USER, 'user'),
    ...createStateSwitchReducers(actionTypes.START_LOADING, actionTypes.STOP_LOADING, 'loading')
  }
};
