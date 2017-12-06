import { Map, Set, fromJS } from 'immutable';

import * as actions from '../consts/action-types';

const defaultState = Map({
  tasksByIds: Map(),
  ids: Set(),
});

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.RECEIVE_TASKS:
      if (!action.payload || action.payload.length === 0) {
        return state
          .set('tasksByIds', Map())
          .set('ids', Set());
      }
      return state
        .set('tasksByIds', fromJS(action.payload.entities.tasks))
        .set('ids', Set(action.payload.result.tasks).sort((a, b) => a - b)); // sort so order is the same as layouts

    case actions.RECEIVE_TASK: {
      const mergedTasks = state.get('tasksByIds').merge(action.payload.entities.tasks);
      const addedIds = state.get('ids').add(action.payload.result.tasks[0]);
      return state
        .set('tasksByIds', mergedTasks)
        .set('ids', addedIds);
    }

    case actions.REMOVE_TASK: {
      const task = action.payload[0];
      const removedTasks = state.get('tasksByIds').delete(task.id);
      const removedIds = state.get('ids').delete(task.id);
      return state
        .set('tasksByIds', removedTasks)
        .set('ids', removedIds);
    }

    default:
      return state;
  }
};

export default taskReducer;
