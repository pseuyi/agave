import * as actions from '../consts/action-types';
import { Map, Set } from 'immutable';

const defaultState = {
  usersByIds: Map(),
  ids: Set(),
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.RECEIVE_USER:
      return {
        usersByIds: state.usersByIds.merge(action.payload.entities.users),
        ids: state.ids.concat(action.payload.result.users),
      };
    default:
      return state;
  }
};

export default userReducer;
