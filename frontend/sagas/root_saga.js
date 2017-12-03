import { fork, takeLatest } from 'redux-saga/effects';

function* fetchTasks() {
  try {
    const tasks = yield call(Api.getTasks);
    yield put({type: 'RECEIVE_TASKS', payload: tasks});
  } catch(error) {
    yield put({type: 'RECEIVE_TASKS_FAILED', error});
  }
}

function* rootSaga() {
  yield[
    fork(fetchTasks),
    takeLatest("USER_FETCH_REQUESTED", fetchTasks);
  ];
}
