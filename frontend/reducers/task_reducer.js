import { Map, Set } from 'immutable';

import * as actions from '../consts/action-types';

const defaultState = {
  tasksByIds: Map(),
  ids: Set(),
};

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.RECEIVE_TASKS:
      return {
        tasksByIds: state.tasksByIds.merge(action.payload.entities.tasks),
        ids: state.ids.concat(action.payload.result.tasks),
      };
    case actions.RECEIVE_TASK: {
      return {
        tasksByIds: state.tasksByIds.merge(action.payload.entities.tasks),
        ids: state.ids.add(action.payload.result.tasks[0]),
      };
    }
    case actions.REMOVE_TASK: {
      const task = action.payload[0];
      return {
        tasksByIds: state.tasksByIds.delete(task.id),
        ids: state.ids.delete(task.id),
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
