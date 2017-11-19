import * as actions from '../consts/action-types';

const defaultState = {
  usersByIds: {},
  ids: []
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.RECEIVE_USER:
      return {
        usersByIds: {
          ...state.usersByIds,
          ...action.payload.entities.users
        },
        ids: [...action.payload.result.users]
      };
    default:
      return state;
  }
}

export default userReducer;
