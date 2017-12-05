import { Map, List } from 'immutable';
import { map } from 'lodash';
import { denormalize } from 'normalizr';

import * as schema from '../util/schema_util';
import * as actions from '../consts/action-types';

const defaultState = Map({
  layouts: Map(),
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

// convert schema to array of tasks
const denormalized = payload => (
  denormalize(
    payload.result,
    schema.tasks,
    payload.entities,
  ).tasks
);

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_LAYOUTS:
      return state.set('layouts', Map(action.layouts));
    case actions.BUILD_LAYOUTS: {
      const builtLayouts = buildLayouts(state, denormalized(action.payload));
      return state.set('layouts', Map({ lg: List(builtLayouts) }));
    }
    case actions.ADD_LAYOUT: {
      const newLgLayout = buildTaskLayout(state, ...denormalized(action.payload));
      return state.getIn(['layouts', 'lg']).concat(newLgLayout);
    }
    case actions.REMOVE_LAYOUT: {
      const task = action.payload[0];
      return state
        .getIn(['layouts', 'lg'])
        .filterNot(layout => layout.i === `${task.id}-${task.title}`);
    }
    default:
      return state;
  }
};

export default boardReducer;
