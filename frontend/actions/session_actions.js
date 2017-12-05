import { receiveError } from './error_actions';

import * as APIUtil from '../util/session_util';
import * as schema from '../util/schema_util';
import * as actions from '../consts/action-types';

export const login = (authData) => (
  {
    type: actions.LOGIN_REQUEST,
    authData,
  }
);

export const logout = (id) => (
  {
    type: actions.LOGOUT_REQUEST,
    id,
  }
);

export const signUp = (formData) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'post',
        url: '/users',
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
      persistToLocalStorage: true
    }
  }
)
//
// export const login = (data) => (
//   {
//     type: actions.API,
//     payload: {
//       options: {
//         method: 'post',
//         url: '/session',
//         data: data
//       },
//       schema: schema.users,
//       success: (data) => [
//         receiveUser(data),
//         receiveCurrentUser(data.result.users[0])
//       ],
//       label: 'users'
//     },
//     meta: {
//       persistToLocalStorage: true
//     }
//   }
// )
//
// export const logout = (id) => (
//   {
//     type: actions.API,
//     payload: {
//       options: {
//         method: 'delete',
//         url: `/session/${id}`
//       },
//       success: () => receiveCurrentUser(null)
//     },
//     meta: {
//       clearLocalStorage: true
//     }
//   }
// )

// export const receiveUser = (payload) => {
//   return {
//     type: actions.RECEIVE_USER,
//     payload
//   }
// }
//
// const receiveCurrentUser = (id) => {
//   return {
//     type: actions.RECEIVE_CURRENT_USER,
//     id
//   }
// }
