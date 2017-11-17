import { RECEIVE_USER } from '../actions/user_actions';

const defaultState = {
  usersByIds: {},
  ids: []
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
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
