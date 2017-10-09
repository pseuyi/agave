import axios from 'axios';
import { receiveError } from './error_actions';

export const RECEIVE_USER = 'USER::RECEIVE_USER';

export const fetchUser = (id) => {
  return (dispatch) => {
    axios.get(`/users/${id}`)
      .then( res => dispatch(receiveUser(res.data.data)) )
      .catch( err => dispatch(receiveError(err.response.data[0])) )
  }
}

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}
