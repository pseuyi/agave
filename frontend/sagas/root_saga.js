import { all } from 'redux-saga/effects';
import { loginFlow, signUpFlow } from './session_saga';
import {
  waitingFetchTasks,
  waitingUpdateTasks,
  waitingCreateTask,
  waitingEditTask,
  waitingDeleteTask,
} from './task_saga';

export default function* rootSaga() {
  yield all([
    loginFlow(),
    signUpFlow(),
    waitingFetchTasks(),
    waitingUpdateTasks(),
    waitingCreateTask(),
    waitingEditTask(),
    waitingDeleteTask(),
  ]);
}
