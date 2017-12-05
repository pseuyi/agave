import { Map, List } from 'immutable';
import { map } from 'lodash';
import { denormalize } from 'normalizr';

import * as schema from '../util/schema_util';
import * as actions from '../consts/action-types';

const defaultState = Map({
  layouts: Map({ lg: null }),
  statuses: List(['open', 'ready', 'in progress', 'done']),
});

const getColIdx = (state, status) => state.get('statuses').indexOf(status);

const buildTaskLayout = (state, task) => (Map({
  i: `${task.id}-${task.title}`,
  x: getColIdx(state, task.status),
  y: task.priority - 1,
  w: 1,
  h: 1,
  isResizable: false,
}));

const buildLayouts = (state, tasks) => map(tasks, task => buildTaskLayout(state, task));

// Convert schema to array of tasks.
// Sort so order matches tasks order.
const denormalized = payload => (
  denormalize(
    payload.result,
    schema.tasks,
    payload.entities,
  ).tasks.sort((a, b) => a.id - b.id)
);

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_LAYOUTS:
      return state.set('layouts', Map(action.layouts));
    case actions.BUILD_LAYOUTS: {
      const builtLayouts = List(buildLayouts(state, denormalized(action.payload)));
      return state.set('layouts', Map({ lg: builtLayouts }));
    }
    case actions.ADD_LAYOUT: {
      const newLayoutItem = buildTaskLayout(state, ...denormalized(action.payload));
      const newLgLayout = state.getIn(['layouts', 'lg']).push(Map(newLayoutItem));
      return state.setIn(['layouts', 'lg'], newLgLayout);
    }
    case actions.REMOVE_LAYOUT: {
      const task = action.payload[0];
      const newLgLayout = state
        .getIn(['layouts', 'lg'])
        .filterNot(layout => layout.get('i') === `${task.id}-${task.title}`);
      return state.setIn(['layouts', 'lg'], newLgLayout);
    }
    default:
      return state;
  }
};

export default boardReducer;
