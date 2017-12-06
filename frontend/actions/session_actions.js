import * as actions from '../consts/action-types';

export const login = authData => ({ type: actions.LOGIN_REQUEST, authData });

export const logout = id => ({ type: actions.LOGOUT_REQUEST, id });

export const signUp = formData => ({ type: actions.SIGN_UP_REQUEST, formData });
