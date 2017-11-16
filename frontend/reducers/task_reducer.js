import { without } from 'lodash';

import {
  RECEIVE_TASKS,
  RECEIVE_TASK,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from 'actions/task_actions';

const defaultState = {
  tasksByIds: {},
  ids: []
}

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      return {
        tasksByIds: action.payload.entities.tasks,
        ids: action.payload.result.tasks
      }
    case RECEIVE_TASK:
      return {
        tasksByIds: {
          ...state.tasksByIds,
          ...action.payload.entities.tasks,
        },
        ids: [...state.ids, ...action.payload.result.tasks]
      }
    case UPDATE_TASK_SUCCESS:
      return {
        tasksByIds: {
          ...state.tasksByIds,
          [action.task.id]: {...action.task},
        },
        ids: [...state.ids]
      }
    case DELETE_TASK_SUCCESS:
      const newTasksByIds = Object.assign({}, state.tasksByIds);
      delete newTasksByIds[action.id];
      const ids = without(state.ids, action.id);
      return {
        tasksByIds: newTasksByIds,
        ids
      }
    default:
      return state
  }
}

export default taskReducer;
