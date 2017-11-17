import axios from 'axios';

import { buildLayouts, addLayout } from './board_actions';
import { receiveError } from './error_actions';

// actions
export const RECEIVE_TASKS = 'TASKS::RECEIVE_TASKS';
export const RECEIVE_TASK = 'TASKS::RECEIVE_TASK';
export const UPDATE_TASK_SUCCESS = 'TASKS::UPDATE_TASK';
export const DELETE_TASK_SUCCESS = 'TASKS::DELETE_TASK';

// action creators
const receiveTasks = (tasks) => {
  return {
    type: RECEIVE_TASKS,
    tasks
  }
}

const receiveTask = (task) => {
  return {
    type: RECEIVE_TASK,
    task
  }
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
  return axios.get('/tasks')
  .then(res => {
    console.log('res', res)
    const tasks = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
    dispatch(buildLayouts(tasks))
    dispatch(receiveTasks(tasks))
  })
  .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const updateTasks = (tasks) => (dispatch) => {
  return axios.patch('/update_tasks', { tasks: tasks })
    .then(res => {
      const tasks = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
      dispatch(buildLayouts(tasks))
      dispatch(receiveTasks(tasks))
    })
    .catch(err => dispatch(receiveError(err.response.data[0])))
}

export const createTask = (newTask) => (dispatch) => {
  return axios.post('/tasks', { task: newTask })
    .then(res => {
      console.log('res', res)
      const task = { id: res.data.data.id, ...res.data.data.attributes }
      dispatch(addLayout(task))
      dispatch(receiveTask(task))
    })
    .catch(err => dispatch(receiveError(err.response.data[0])))
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
