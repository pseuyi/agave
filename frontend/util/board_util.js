import { map } from 'lodash';
import { Map } from 'immutable';
import { denormalize } from 'normalizr';
import * as schema from '../util/schema_util';

const getColIdx = (state, status) => state.get('statuses').indexOf(status);

export const buildTaskLayout = (state, task) => (Map({
  i: `${task.id}-${task.title}`,
  x: getColIdx(state, task.status),
  y: task.priority - 1,
  w: 1,
  h: 1,
  isResizable: false,
}));

export const buildLayouts = (state, tasks) => map(tasks, task => buildTaskLayout(state, task));

// Convert schema to array of tasks.
// Sort so order matches tasks order.
export const denormalized = payload => (
  denormalize(
    payload.result,
    schema.tasks,
    payload.entities,
  ).tasks.sort((a, b) => a.id - b.id)
);
