import { Map } from 'immutable';
import * as actions from '../consts/action-types';

const defaultState = Map({
  currentUser: null,
  error: '',
});

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.SIGN_UP_SUCCESS:
      return state
        .set('currentUser', Map(action.payload))
        .set('error', '');

    case actions.LOGOUT_SUCCESS:
      return state
        .set('currentUser', null)
        .set('error', '');

    case actions.LOGIN_ERROR:
    case actions.LOGOUT_ERROR:
    case actions.SIGN_UP_ERROR:
      return state
        .set('currentUser', null)
        .set('error', action.payload);

    default:
      return state;
  }
};

export default sessionReducer;
