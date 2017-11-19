import { map } from 'lodash';
import { denormalize } from 'normalizr';

import * as schema from '../util/schema_util';
import * as actions from '../consts/action-types';

const defaultState = {
  layouts: {},
  statuses: ['open', 'ready', 'in progress', 'done'],
}

const buildLayouts = (state, tasks) => (
  map(tasks, (task) => buildTaskLayout(state, task))
)

const buildTaskLayout = (state, task) => ({
  i: `${task.id}-${task.title}`,
  x: getColIdx(state, task.status),
  y: task.priority - 1,
  w: 1,
  h: 1,
  isResizable: false,
});

const getColIdx = (state, status) => state.statuses.indexOf(status);

const denormalized = action => (
  denormalize(
    action.payload.result,
    schema.tasks,
    action.payload.entities
  ).tasks
)

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_LAYOUTS:
      return { ...state, layouts: action.layouts };
    case actions.BUILD_LAYOUTS:
      return {
        ...state,
        layouts: {
          lg: buildLayouts(state, denormalized(action))
        }
      };
    case actions.ADD_LAYOUT:
      return {
        ...state,
        layouts: {
          lg: [
            ...state.layouts.lg,
            buildTaskLayout(state, ...denormalized(action))
          ]
        }
      }
    default:
      return state;
  }
}

export default boardReducer;
