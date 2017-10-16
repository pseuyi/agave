import axios from 'axios';
import { receiveUser } from './user_actions';
import { receiveError } from './error_actions';
import * as APIUtil from '../util/session_util';

export const RECEIVE_CURRENT_USER = 'SESSION::RECEIVE_CURRENT_USER'

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
        APIUtil.setUserLocalStorage(res.data.data);
        return dispatch(receiveUser(res.data.data));
      })
      .then( res => dispatch(receiveCurrentUser(res.user.id)) )
      .catch( err => dispatch(receiveError(err.response.data[0])) )
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
    type: RECEIVE_CURRENT_USER,
    id
  }
}
