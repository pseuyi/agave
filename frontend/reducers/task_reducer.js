import { without } from 'lodash';

import * as actions from '../consts/action-types';

const defaultState = {
  tasksByIds: {},
  ids: []
}

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.RECEIVE_TASKS:
      return {
        tasksByIds: action.payload.entities.tasks,
        ids: action.payload.result.tasks
      }
    case actions.RECEIVE_TASK:
      return {
        tasksByIds: {
          ...state.tasksByIds,
          ...action.payload.entities.tasks,
        },
        ids: [...state.ids, ...action.payload.result.tasks]
      }
    case actions.DELETE_TASK_SUCCESS:
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
