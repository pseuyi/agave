import axios from 'axios';
import { normalize } from 'normalizr';

import { receiveUser } from './user_actions';
import { receiveError } from './error_actions';

import * as APIUtil from '../util/session_util';
import * as schema from '../lib/schema';
import * as actions from '../consts/action-types';

export const signUp = (formData) => {
  return (dispatch) => (
    axios.post('/users', formData)
    .then( res => {
      APIUtil.setUserLocalStorage(res.data.data);
      return dispatch(receiveUser(res.data.data));
    })
    .then( res => dispatch(receiveCurrentUser(res.user.id)) )
    .catch( err => dispatch(receiveError(err.response.data[0])) )
  )
}

export const login = (formData) => {
  return (dispatch) => (
    axios.post('/session', formData)
      .then( res => {
        const users = [{ id: res.data.data.id, ...res.data.data.attributes }]
        const normalizedData = normalize({ users }, schema.users)
        APIUtil.setUserLocalStorage(normalizedData);
        return dispatch(receiveUser(normalizedData));
      })
      .then( data => {
        dispatch(receiveCurrentUser(data.payload.result.users[0]))
      })
      // .catch( err => dispatch(receiveError(err.response.data[0])) )
  )
}

export const logout = (id) => {
  return (dispatch) => {
    axios.delete(`/session/${id}`)
      .then( user => {
        APIUtil.removeUserLocalStorage();
        return dispatch(receiveCurrentUser(null));
      })
      .catch( err => dispatch(receiveError(err.response.data[0])) )
  }
}

const receiveCurrentUser = (id) => {
  return {
    type: actions.RECEIVE_CURRENT_USER,
    id
  }
}
