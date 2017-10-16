import { keyBy, without } from 'lodash';

import {
  RECEIVE_TASKS,
  CREATE_TASK_SUCCESS,
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
      const tasksByIds = keyBy(action.tasks, 'id');
      return {
        tasksByIds: {
          ...state.tasksByIds,
          ...tasksByIds,
        },
        ids: [
          ...state.ids,
          ...Object.keys(tasksByIds),
        ]
      }
    case CREATE_TASK_SUCCESS:
      return {
        tasksByIds: {
          ...state.tasksByIds,
          [action.payload.id]: {...action.payload},
        },
        ids: [...state.ids, action.payload.id]
      }
    case UPDATE_TASK_SUCCESS:
      return {
        tasksByIds: {
          ...state.tasksByIds,
          [action.payload.id]: {...action.payload},
        },
        ids: [...state.ids]
      }
    case DELETE_TASK_SUCCESS:
      const { action.payload, ...tasksByIds } = state.taskByIds
      const ids = without(state.ids, action.payload);
      return {
        tasksByIds,
        ids
      }
    default:
      return state
  }
}

export default taskReducer;
