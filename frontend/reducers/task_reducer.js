import { keyBy } from 'lodash';

import { RECEIVE_TASKS } from 'actions/task_actions';

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
    default:
      return state
  }
}

export default taskReducer;
