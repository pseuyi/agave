import { fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { massageData } from '../util/api_util';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from 'reducers/session_reducer';

const login = authData => axios.post('/session', authData);

function* handleLogin(authData) {
  try {
    const res = yield call(login, authData);
    const formattedUser = yield call(massageData, res);
    yield put({ type: LOGIN_SUCCESS, payload: formattedUser[0] });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
  }
}

const logout = id => axios.delete(`/session/${id}`);

function* handleLogout(id) {
  try {
    yield call(logout, id);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: LOGOUT_ERROR, payload: error });
  }
}

const signUp = formData => axios.post('/users', formData);

function* handleSignUp(formData) {
  try {
    const res = yield call(signUp, formData);
    const formattedUser = yield call(massageData, res);
    yield put({ type: SIGN_UP_SUCCESS, payload: formattedUser[0] });
  } catch (error) {
    yield put({ type: SIGN_UP_ERROR, payload: error });
  }
}

export function* loginFlow() {
  while (true) {
    const { authData } = yield take(LOGIN_REQUEST);
    yield fork(handleLogin, authData);
    const { id } = yield take(LOGOUT_REQUEST);
    yield call(handleLogout, id);
  }
}

export function* signUpFlow() {
  while (true) {
    const { formData } = yield take(SIGN_UP_REQUEST);
    yield fork(handleSignUp, formData);
    const { id } = yield take(LOGOUT_REQUEST);
    yield call(handleLogout, id);
  }
}
