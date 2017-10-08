export const RECEIVE_ERROR = 'ERROR::RECEIVE_ERROR';

export const receiveError = (error) => {
  return {
    type: RECEIVE_ERROR,
    error
  }
}
