import * as actions from '../consts/action-types';

const errorReducer = (state = "", action) => {
  switch (action.type) {
    case actions.RECEIVE_ERROR:
      return action.error;
    default:
      return state;
  }
}

export default errorReducer;
