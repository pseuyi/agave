import axios from 'axios';

import { receiveError } from './error_actions';

// actions
export const RECEIVE_TASKS = 'TASKS::RECEIVE_TASKS';
export const CREATE_TASK_SUCCESS = 'TASKS::CREATE_TASK';
export const UPDATE_TASK_SUCCESS = 'TASKS::UPDATE_TASK';
export const DELETE_TASK_SUCCESS = 'TASKS::DELETE_TASK';

// action creators
const receiveTasks = (data) => {
  const tasks = data.map((d) =>  ({ ...d.attributes, id: d.id }))
  return {
    type: RECEIVE_TASKS,
    tasks
  }
}

const createTask = (task) => {
  type: CREATE_TASK_SUCCESS,
  task
}

const updateTask = (task) => {
  type: UPDATE_TASK_SUCCESS,
  task
}

const deleteTask = (id) => {
  type: DELETE_TASK_SUCCESS,
  id
}

export const fetchTasks = (userId) => (dispatch) => {
  axios.get(`users/${userId}/tasks`)
  .then(res => dispatch(receiveTasks(res.data.data)))
  .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const addTask = (userId, newTask) => (dispatch) => {
  axios.post(`users/${userId}/tasks`, newTask)
  .then(res => {
    dispatch(createTask(res.data.data))
  })
  .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const editTask = (userId, taskId) => (dispatch) => {
  axios.patch(`users/${userId}/tasks/${taskId}`)
  .then(res => dispatch(updateTask(res.data.data)))
  .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const removeTask = (userId, taskId) => (dispatch) => {
  axios.delete(`users/${userId}/tasks/${taskId}`)
  .then(res => dispatch(deleteTask(taskId)))
  .catch(err => dispatch(receiveError(err.response.data[0])))
}
