import axios from 'axios';
import { receiveUser } from './user_actions';
import { receiveError } from './error_actions';

export const RECEIVE_CURRENT_USER = 'SESSION::RECEIVE_CURRENT_USER'

export const login = (formData) => {
  return (dispatch) => {
    axios.post('/session', formData)
      .then( res => dispatch(receiveUser(res.data.data)) )
      .then( res => dispatch(receiveCurrentUser(res.user.id)) )
      .catch( err => dispatch(receiveError(err.response.data[0])) )
  }
}

export const logout = (user) => {
  return (dispatch) => {
    axios.delete('/session', { user })
      .then( user => dispatch(receiveCurrentUser(null)) )
      .catch( err => dispatch(receiveError(err.response.data[0])) )
  }
}

export const signUp = (formData) => {
  return (dispatch) => {
    axios.post('/users', formData)
      .then( res => dispatch(receiveUser(res.data.data)) )
      .then( res => dispatch(receiveCurrentUser(res.user.id)) )
      .catch( err => dispatch(receiveError(err.response.data[0])) )
  }
}


const receiveCurrentUser = (id) => {
  return {
    type: RECEIVE_CURRENT_USER,
    id
  }
}
