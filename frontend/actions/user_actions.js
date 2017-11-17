import axios from 'axios';
import { normalize } from 'normalizr';

import { receiveError } from './error_actions';

import * as schema from '../lib/schema';
import * as actions from '../consts/action-types';

export const fetchUser = (id) => {
  return (dispatch) => {
    axios.get(`/users/${id}`)
      .then( res => {
        const users = [{ id: res.data.data.id, ...res.data.data.attributes }]
        console.log(normalize({ users }, schema.users))
        dispatch(receiveUser(res.data.data))
      })
      .catch( err => dispatch(receiveError(err.response.data[0])) )
  }
}

export const receiveUser = (payload) => {
  return {
    type: actions.RECEIVE_USER,
    payload
  }
}
