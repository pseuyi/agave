import axios from 'axios';
import { receiveUser } from './user_actions';
import { receiveError } from './error_actions';

export const RECEIVE_CURRENT_USER = 'SESSION::RECEIVE_CURRENT_USER'


export const login = (user) => {
  return (dispatch) => {
    axios.patch('/session', { user })
      .then( user => dispatch(receiveUser(user)) )
      .then( res => dispatch(receiveCurrentUser(res.user.id)) )
      .catch( err => dispatch(receiveError(err)) )
  }
}

export const logout = (user) => {
  return (dispatch) => {
    axios.delete('/session', { user })
      .then( user => dispatch(receiveCurrentUser(null)) )
      .catch( err => dispatch(receiveError(err)) )
  }
}

export const signUp = (formData) => {
  return (dispatch) => {
    return axios.post('/users', formData)
            .then( user => {
              debugger
              // console.log('user', user)
              // return dispatch(receiveUser(user))
            }  )
            .then( res => dispatch(receiveCurrentUser(res.user.id)) )
            .catch( err => {
              console.log('err', err)
              // dispatch(receiveError(err))
            })
  }
}


const receiveCurrentUser = (id) => {
  return {
    type: RECEIVE_CURRENT_USER,
    id
  }
}
