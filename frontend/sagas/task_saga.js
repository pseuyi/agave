import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { massageData } from '../util/api_util';
import * as actions from '../consts/action-types';
import * as schema from '../util/schema_util';

const fetchTasks = () => axios.get('/tasks');

function* handleFetchTasks() {
  try {
    const res = yield call(fetchTasks);
    const formattedTasks = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: actions.BUILD_LAYOUTS, payload: formattedTasks });
    yield put({ type: actions.FETCH_TASKS_SUCCESS, payload: formattedTasks });
  } catch (error) {
    yield put({ type: actions.FETCH_TASKS_ERROR, payload: error });
  }
}

const updateTasks = tasks => axios.patch('/update_tasks', { tasks });

function* handleUpdateTasks(tasks) {
  try {
    const res = yield call(updateTasks, tasks);
    const formattedTasks = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: actions.BUILD_LAYOUTS, payload: formattedTasks });
    yield put({ type: actions.UPDATE_TASKS_SUCCESS, payload: formattedTasks });
  } catch (error) {
    yield put({ type: actions.UPDATE_TASKS_ERROR, payload: error });
  }
}

const createTask = task => axios.post('/tasks', { task });

function* handleCreateTask(task) {
  try {
    const res = yield call(createTask, task);
    const formattedTask = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: actions.ADD_LAYOUT, payload: formattedTask });
    yield put({ type: actions.CREATE_TASK_SUCCESS, payload: formattedTask });
  } catch (error) {
    yield put({ type: actions.CREATE_TASK_ERROR, payload: error });
  }
}

const editTask = task => axios.patch(`/tasks/${task.id}`, { task });

function* handleEditTask(task) {
  try {
    const res = yield call(editTask, task);
    const formattedTask = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: actions.EDIT_TASK_SUCCESS, payload: formattedTask });
  } catch (error) {
    yield put({ type: actions.EDIT_TASK_ERROR, payload: error });
  }
}

const deleteTask = id => axios.delete(`/tasks/${id}`);

function* handleDeleteTask(task) {
  try {
    const res = yield call(deleteTask, task);
    const formattedTask = yield call(massageData, res);
    yield put({ type: actions.REMOVE_LAYOUT, payload: formattedTask });
    yield put({ type: actions.DELETE_TASK_SUCCESS, payload: formattedTask });
  } catch (error) {
    yield put({ type: actions.DELETE_TASK_ERROR, payload: error });
  }
}

export function* waitingFetchTasks() {
  while (true) {
    yield take(actions.FETCH_TASKS_REQUEST);
    yield fork(handleFetchTasks);
  }
}

export function* waitingUpdateTasks() {
  while (true) {
    const { tasks } = yield take(actions.UPDATE_TASKS_REQUEST);
    yield fork(handleUpdateTasks, tasks);
  }
}

export function* waitingCreateTask() {
  while (true) {
    const { task } = yield take(actions.CREATE_TASK_REQUEST);
    yield fork(handleCreateTask, task);
  }
}

export function* waitingEditTask() {
  while (true) {
    const { task } = yield take(actions.EDIT_TASK_REQUEST);
    yield fork(handleEditTask, task);
  }
}

export function* waitingDeleteTask() {
  while (true) {
    const { id } = yield take(actions.DELETE_TASK_REQUEST);
    yield fork(handleDeleteTask, id);
  }
}
