import axios from 'axios';
import { receiveError } from './error_actions';

export const RECEIVE_USER = 'USER::RECEIVE_USER';



export const fetchUser = (id) => {
  return (dispatch) => {
    axios.get(`/users/${id}`)
      .then( user => dispatch(receiveUser(user)) )
      .catch( err => dispatch(receiveError(err)) )
  }
}


export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}
