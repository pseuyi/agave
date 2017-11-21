import { without } from 'lodash';

import * as actions from '../consts/action-types';
import * as schema from '../util/schema_util';

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
      const stateIds = Object.assign([], state.ids);
      const newId = action.payload.result.tasks[0];
      if (!stateIds.includes(newId)) stateIds.push(newId);
      return {
        tasksByIds: {
          ...state.tasksByIds,
          ...action.payload.entities.tasks,
        },
        ids: [...stateIds]
      }
    case actions.REMOVE_TASK:
      const task = action.payload[0];
      const newTasksByIds = Object.assign({}, state.tasksByIds);
      delete newTasksByIds[task.id];
      const ids = without(state.ids, task.id);
      return {
        tasksByIds: newTasksByIds,
        ids
      }
    default:
      return state
  }
}

export default taskReducer;
