import { Map, Set, fromJS } from 'immutable';

import * as actions from '../consts/action-types';

const defaultState = Map({
  tasksByIds: Map(),
  ids: Set(),
  error: '',
});

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.FETCH_TASKS_SUCCESS:
    case actions.UPDATE_TASKS_SUCCESS:
      if (!action.payload || action.payload.length === 0) {
        return state
          .set('tasksByIds', Map())
          .set('ids', Set())
          .set('error', '');
      }
      return state
        .set('tasksByIds', fromJS(action.payload.entities.tasks))
        .set('ids', Set(action.payload.result.tasks).sort((a, b) => a - b)) // sort so order is the same as layouts
        .set('error', '');

    case actions.CREATE_TASK_SUCCESS:
    case actions.EDIT_TASK_SUCCESS: {
      const mergedTasks = state.get('tasksByIds').merge(action.payload.entities.tasks);
      const addedIds = state.get('ids').add(action.payload.result.tasks[0]);
      return state
        .set('tasksByIds', mergedTasks)
        .set('ids', addedIds)
        .set('error', '');
    }

    case actions.DELETE_TASK_SUCCESS: {
      const task = action.payload[0];
      const removedTasks = state.get('tasksByIds').delete(task.id);
      const removedIds = state.get('ids').delete(task.id);
      return state
        .set('tasksByIds', removedTasks)
        .set('ids', removedIds)
        .set('error', '');
    }

    case actions.FETCH_TASKS_ERROR:
    case actions.UPDATE_TASKS_ERROR:
    case actions.CREATE_TASK_ERROR:
    case actions.DELETE_TASK_ERROR:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export default taskReducer;
