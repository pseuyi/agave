import * as actions from '../consts/action-types';


const defaultState = {
  currentUser: null,
}

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.RECEIVE_CURRENT_USER:
      return {
        currentUser: parseInt(action.id)
      };
    default:
      return state;
  }
}

export default sessionReducer;
