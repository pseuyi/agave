import { RECEIVE_USER } from '../actions/user_actions';

const defaultState = {
  entities: {},
  ids: []
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      const newEntities = { ...state.entities, [action.user.id]: action.user.attributes }
      return { ...state, entities: newEntities, };
    default:
      return state;
  }
}

export default userReducer;
