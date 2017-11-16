import axios from 'axios';
import { normalize } from 'normalizr';

import { buildLayouts, addLayout } from './board_actions';
import { receiveError } from './error_actions';

import * as schema from '../lib/schema';

// actions
export const RECEIVE_TASKS = 'TASKS::RECEIVE_TASKS';
export const RECEIVE_TASK = 'TASKS::RECEIVE_TASK';
export const DELETE_TASK_SUCCESS = 'TASKS::DELETE_TASK';

// action creators
const receiveTasks = (payload) => ({
    type: RECEIVE_TASKS,
    payload
})

const receiveTask = (payload) => ({
    type: RECEIVE_TASK,
    payload
})

const deleteTask = (id) => ({
  type: DELETE_TASK_SUCCESS,
  id
})

export const fetchTasks = (userId) => (dispatch) => {
  return axios.get('/tasks')
  .then(res => {
    const tasks = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
    const normalizedData = normalize({ tasks }, schema.tasks)
    dispatch(buildLayouts(normalizedData))
    dispatch(receiveTasks(normalizedData))
  })
  // .catch(err => dispatch(receiveError(err.response.data[0])))
}

// updates all tasks priority and layout positions
export const updateTasks = (tasks) => (dispatch) => {
  return axios.patch('/update_tasks', { tasks: tasks })
    .then(res => {
      const tasks = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
      const normalizedData = normalize({ tasks }, schema.tasks)
      dispatch(buildLayouts(normalizedData))
      dispatch(receiveTasks(normalizedData))
    })
    .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const createTask = (newTask) => (dispatch) => {
  return axios.post('/tasks', { task: newTask })
    .then(res => {
      const tasks = [{ id: res.data.data.id, ...res.data.data.attributes }]
      const normalizedData = normalize({ tasks }, schema.tasks)
      dispatch(addLayout(normalizedData))
      dispatch(receiveTask(normalizedData))
    })
    // .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const editTask = (userId, taskId) => (dispatch) => {
  axios.patch(`/tasks/${taskId}`)
  .then(res => dispatch(updateTask(res.data.data)))
  .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const removeTask = (userId, taskId) => (dispatch) => {
  axios.delete(`/tasks/${taskId}`)
  .then(res => dispatch(deleteTask(taskId)))
  .catch(err => dispatch(receiveError(err.response.data[0])))
}
