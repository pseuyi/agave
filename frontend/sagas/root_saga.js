import { fork, take, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { normalize } from 'normalizr';
import { keys } from 'lodash';
import * as actions from '../consts/action-types';
import * as schema from '../util/schema_util';

const massageData = (res, schema, label) => {
  if (keys(res.data.data).length === 0) return res.data.data
  let data;

  if (Array.isArray(res.data.data)) {
    data = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
  } else {
    data = [{ id: res.data.data.id, ...res.data.data.attributes }]
  }

  if (schema) return normalizedData(data, schema, label);

  return data;
}

const login = data => axios.post('/session', data);

function* handleLogin(authData) {
  try {
    const user = yield call(login, authData)
    const formattedUser = yield call(massageData, user)
    yield put({ type: actions.LOGIN_SUCCESS, payload: formattedUser, schema: schema.users, label: 'users' })
  } catch (error) {
    yield put({ type: actions.LOGIN_ERROR, payload: error })
  }
}

const logout = id => axios.delete(`/session/${id}`);

function* handleLogout(id) {
  try {
    const action = yield call(logout, id)
    yield put({ type: actions.LOGOUT_SUCCESS })
  } catch (error) {
    yield put({ type: actions.LOGOUT_ERROR })
  }
}

function* loginFlow() {
  while (true) {
    const authData = yield take(actions.LOGIN_REQUEST)
    yield fork(handleLogin, authData)
    const id = yield take(actions.LOGOUT_REQUEST)
    yield call(logout, id)
  }
}

export default function* rootSaga() {
  yield all([
    loginFlow()
  ])
};

/*

uncaught at check take(patternOrChannel): patternOrChannel is undefined

utils.js:225 uncaught at rootSaga at rootSaga
 at rootSaga
 Error: take(patternOrChannel): patternOrChannel is undefined

*/
