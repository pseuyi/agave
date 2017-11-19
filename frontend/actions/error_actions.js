import * as actions from '../consts/action-types';

export const receiveError = (error) => {
  return {
    type: actions.RECEIVE_ERROR,
    error
  }
}
