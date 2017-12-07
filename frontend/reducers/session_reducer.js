import { Map } from 'immutable';

export const LOGIN_REQUEST = 'SESSION::LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'SESSION::LOGIN_SUCCESS';
export const LOGIN_ERROR = 'SESSION::LOGIN_ERROR';
export const LOGOUT_REQUEST = 'SESSION::LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'SESSION::LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'SESSION::LOGOUT_ERROR';
export const SIGN_UP_REQUEST = 'SESSION::SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SESSION::SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SESSION::SIGN_UP_ERROR';

export const login = authData => ({ type: LOGIN_REQUEST, authData });
export const logout = id => ({ type: LOGOUT_REQUEST, id });
export const signUp = formData => ({ type: SIGN_UP_REQUEST, formData });


const defaultState = Map({
  currentUser: null,
  error: '',
});

const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state
        .set('currentUser', Map(action.payload))
        .set('error', '');

    case LOGOUT_SUCCESS:
      return state
        .set('currentUser', null)
        .set('error', '');

    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case SIGN_UP_ERROR:
      return state
        .set('currentUser', null)
        .set('error', action.payload);

    default:
      return state;
  }
};

export default sessionReducer;
