import axios from 'axios';
import { normalize } from 'normalizr';
import { get, keys } from 'lodash';

import { receiveError } from 'actions/error_actions';
import * as APIUtil from '../util/session_util';
import * as actions from '../consts/action-types';
import * as schema from '../util/schema_util';

const normalizedData = (data, schema, label) => normalize({ [label]: data }, schema);

const massageData = (res, schema, label) => {
  if (keys(res.data.data).length === 0) return res.data.data
  let data;

  if (Array.isArray(res.data.data)) {
    data = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
  } else {
    data = [{ id: res.data.data.id, ...res.data.data.attributes }]
  }

  if (schema) return normalizedData(data, schema, label);

  return data;
}

const handleMeta = (data, action) => {
  if (get(action, 'meta.persistToLocalStorage', false)) {
    APIUtil.setUserLocalStorage(data)
  }

  if (get(action, 'meta.clearLocalStorage', false)) {
    APIUtil.removeUserLocalStorage()
  }

  return data;
}

const handleSuccess = (data, success, dispatch) => {
  if (Array.isArray(success(data))) {
    success(data).forEach(action => dispatch(action))
  } else {
    dispatch(success(data));
  }
}

const api = ({ getState, dispatch }) => next => action => {
  if (action.type !== actions.API) {
    return next(action);
  }

  const { options, schema, success, label } = action.payload;

  axios({ ...options })
    .then( res => massageData(res, schema, label) )
    .then( data => handleMeta(data, action) )
    .then( data => handleSuccess(data, success, dispatch) )
    .catch( err => dispatch(receiveError(err)) )
}

export default api;
