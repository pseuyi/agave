import axios from 'axios';
import { normalize } from 'normalizr';

import { buildLayouts, addLayout } from './board_actions';
import { receiveError } from './error_actions';

import * as actions from '../consts/action-types';
import * as schema from '../lib/schema';

// action creators
const receiveTasks = (payload) => ({
    type: actions.RECEIVE_TASKS,
    payload
})

const receiveTask = (payload) => ({
    type: actions.RECEIVE_TASK,
    payload
})

const deleteTask = (id) => ({
  type: actions.DELETE_TASK_SUCCESS,
  id
})

export const fetchTasks = () => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'get',
        url: '/tasks'
      },
      schema: schema.tasks,
      success: (data) => [
        buildLayouts(data),
        receiveTasks(data)
      ],
      label: 'tasks'
    }
  }
)

export const updateTasks = (tasks) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'patch',
        url: '/update_tasks',
        data: { tasks }
      },
      schema: schema.tasks,
      success: (data) => [
        buildLayouts(data),
        receiveTasks(data)
      ],
      label: 'tasks'
    }
  }
)

export const createTask = (newTask) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'post',
        url: '/tasks',
        data: { task: newTask }
      },
      schema: schema.tasks,
      success: (data) => [
        addLayout(data),
        receiveTask(data)
      ],
      label: 'tasks'
    }
  }
)

// export const editTask = (userId, taskId) => (dispatch) => {
//   axios.patch(`/tasks/${taskId}`)
//   .then(res => dispatch(updateTask(res.data.data)))
//   .catch(err => dispatch(receiveError(err.response.data[0])))
// }
//
// export const removeTask = (userId, taskId) => (dispatch) => {
//   axios.delete(`/tasks/${taskId}`)
//   .then(res => dispatch(deleteTask(taskId)))
//   .catch(err => dispatch(receiveError(err.response.data[0])))
// }
