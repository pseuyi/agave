import { fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { massageData } from '../util/api_util';
import * as actions from '../consts/action-types';

const login = authData => axios.post('/session', authData);

function* handleLogin(authData) {
  try {
    const res = yield call(login, authData);
    const formattedUser = yield call(massageData, res);
    yield put({ type: actions.LOGIN_SUCCESS, payload: formattedUser[0] });
  } catch (error) {
    yield put({ type: actions.LOGIN_ERROR, payload: error });
  }
}

const logout = id => axios.delete(`/session/${id}`);

function* handleLogout(id) {
  try {
    yield call(logout, id);
    yield put({ type: actions.LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: actions.LOGOUT_ERROR, payload: error });
  }
}

const signUp = formData => axios.post('/users', formData);

function* handleSignUp(formData) {
  try {
    const res = yield call(signUp, formData);
    const formattedUser = yield call(massageData, res);
    yield put({ type: actions.SIGN_UP_SUCCESS, payload: formattedUser[0] });
  } catch (error) {
    yield put({ type: actions.SIGN_UP_ERROR, payload: error });
  }
}

export function* loginFlow() {
  while (true) {
    const { authData } = yield take(actions.LOGIN_REQUEST);
    yield fork(handleLogin, authData);
    const { id } = yield take(actions.LOGOUT_REQUEST);
    yield call(handleLogout, id);
  }
}

export function* waitingSignUp() {
  while (true) {
    const { formData } = yield take(actions.SIGN_UP_REQUEST);
    yield fork(handleSignUp, formData);
    const { id } = yield take(actions.LOGOUT_REQUEST);
    yield call(handleLogout, id);
  }
}
