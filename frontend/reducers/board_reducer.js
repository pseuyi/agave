import {
  UPDATE_LAYOUTS,
  BUILD_LAYOUTS,
  ADD_LAYOUT,
} from 'actions/board_actions';
import { map } from 'lodash';

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

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUTS:
      return { ...state, layouts: action.layouts };
    case BUILD_LAYOUTS:
      return {
        ...state,
        layouts: {
          lg: buildLayouts(state, action.tasks)
        }
      };
    case ADD_LAYOUT:
      return {
        ...state,
        layouts: {
          lg: [
            ...state.layouts.lg,
            buildTaskLayout(action.task)
          ]
        }
      }
    default:
      return state;
  }
}

export default boardReducer;
