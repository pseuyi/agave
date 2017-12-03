import { fork, takeLatest, call, put } from 'redux-saga/effects';

function* fetchTasks() {
  try {
    const tasks = yield call(Api.getTasks);
    yield put({type: 'FETCH_TASKS_SUCCESS', payload: tasks});
  } catch(error) {
    yield put({type: 'FETCH_TASKS_FAILURE', error});
  }
}

export default function* rootSaga() {
  yield[
    fork(fetchTasks),
    takeLatest("FETCH_TASKS", fetchTasks),
  ];
}

/*
FETCH_TASKS
FETCH_TASKS_SUCCESS
FETCH_TASKS_FAILURE
*/

function getTasks () {
  fetch('http://blahblah')
}
