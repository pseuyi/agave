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

export const login = (formData) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'post',
        url: '/session',
        data: formData
      },
      schema: schema.users,
      success: (data) => [
        receiveUser(data),
        receiveCurrentUser(data.result.users[0])
      ],
      label: 'users'
    },
    meta: {
      session: 'login'
    }
  }
)

export const logout = (id) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'delete',
        url: `/session/${id}`
      },
      success: () => receiveCurrentUser(null)
    },
    meta: {
      session: 'logout'
    }
  }
)

const receiveCurrentUser = (id) => {
  return {
    type: actions.RECEIVE_CURRENT_USER,
    id
  }
}
