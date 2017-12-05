import { Map } from 'immutable';
import * as actions from '../consts/action-types';

const defaultState = Map({
  currentUser: null,
  error: '',
});

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('currentUser', Map(action.payload));
    case actions.LOGIN_ERROR:
      return {
        currentUser: null,
        error: 'Login failed',
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case actions.LOGOUT_ERROR:
      return {
        ...state,
        error: 'Logout failed',
      };
    default:
      return state;
  }
};

export default sessionReducer;
