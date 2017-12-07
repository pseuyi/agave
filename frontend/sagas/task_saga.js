import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { massageData } from '../util/api_util';
import * as schema from '../util/schema_util';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_ERROR,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
} from 'reducers/task_reducer';
import {
  BUILD_LAYOUTS,
  ADD_LAYOUT,
  REMOVE_LAYOUT,
} from 'reducers/board_reducer';

const fetchTasks = () => axios.get('/tasks');

function* handleFetchTasks() {
  try {
    const res = yield call(fetchTasks);
    const formattedTasks = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: BUILD_LAYOUTS, payload: formattedTasks });
    yield put({ type: FETCH_TASKS_SUCCESS, payload: formattedTasks });
  } catch (error) {
    yield put({ type: FETCH_TASKS_ERROR, payload: error });
  }
}

const updateTasks = tasks => axios.patch('/update_tasks', { tasks });

function* handleUpdateTasks(tasks) {
  try {
    const res = yield call(updateTasks, tasks);
    const formattedTasks = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: BUILD_LAYOUTS, payload: formattedTasks });
    yield put({ type: UPDATE_TASKS_SUCCESS, payload: formattedTasks });
  } catch (error) {
    yield put({ type: UPDATE_TASKS_ERROR, payload: error });
  }
}

const createTask = task => axios.post('/tasks', { task });

function* handleCreateTask(task) {
  try {
    const res = yield call(createTask, task);
    const formattedTask = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: ADD_LAYOUT, payload: formattedTask });
    yield put({ type: CREATE_TASK_SUCCESS, payload: formattedTask });
  } catch (error) {
    yield put({ type: CREATE_TASK_ERROR, payload: error });
  }
}

const editTask = task => axios.patch(`/tasks/${task.id}`, { task });

function* handleEditTask(task) {
  try {
    const res = yield call(editTask, task);
    const formattedTask = yield call(massageData, res, schema.tasks, 'tasks');
    yield put({ type: EDIT_TASK_SUCCESS, payload: formattedTask });
  } catch (error) {
    yield put({ type: EDIT_TASK_ERROR, payload: error });
  }
}

const deleteTask = id => axios.delete(`/tasks/${id}`);

function* handleDeleteTask(task) {
  try {
    const res = yield call(deleteTask, task);
    const formattedTask = yield call(massageData, res);
    yield put({ type: REMOVE_LAYOUT, payload: formattedTask });
    yield put({ type: DELETE_TASK_SUCCESS, payload: formattedTask });
  } catch (error) {
    yield put({ type: DELETE_TASK_ERROR, payload: error });
  }
}

export function* waitingFetchTasks() {
  while (true) {
    yield take(FETCH_TASKS_REQUEST);
    yield fork(handleFetchTasks);
  }
}

export function* waitingUpdateTasks() {
  while (true) {
    const { tasks } = yield take(UPDATE_TASKS_REQUEST);
    yield fork(handleUpdateTasks, tasks);
  }
}

export function* waitingCreateTask() {
  while (true) {
    const { task } = yield take(CREATE_TASK_REQUEST);
    yield fork(handleCreateTask, task);
  }
}

export function* waitingEditTask() {
  while (true) {
    const { task } = yield take(EDIT_TASK_REQUEST);
    yield fork(handleEditTask, task);
  }
}

export function* waitingDeleteTask() {
  while (true) {
    const { id } = yield take(DELETE_TASK_REQUEST);
    yield fork(handleDeleteTask, id);
  }
}
