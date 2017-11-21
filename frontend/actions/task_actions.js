import axios from 'axios';

import { buildLayouts, addLayout, removeLayout } from './board_actions';
import { receiveError } from './error_actions';

import * as actions from '../consts/action-types';
import * as schema from '../util/schema_util';

const receiveTasks = (payload) => ({
    type: actions.RECEIVE_TASKS,
    payload
})

const receiveTask = (payload) => ({
    type: actions.RECEIVE_TASK,
    payload
})

const removeTask = (payload) => ({
  type: actions.REMOVE_TASK,
  payload
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

export const editTask = (task) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'patch',
        url: `/tasks/${task.id}`,
        data: { task }
      },
      schema: schema.tasks,
      success: (data) => receiveTask(data),
      label: 'tasks'
    }
  }
)

export const deleteTask = (id) => (
  {
    type: actions.API,
    payload: {
      options: {
        method: 'delete',
        url: `/tasks/${id}`
      },
      success: (data) => [
        removeLayout(data),
        removeTask(data),
      ]
    }
  }
)
