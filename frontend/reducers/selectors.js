import { groupBy, orderBy } from 'lodash';
import { createSelector } from 'reselect';

export const currentUserSelector = state =>
  state.users.usersByIds[state.session.currentUser];

export const getTasksIds = state => state.tasks.ids;
export const getTasks = state => state.tasks.tasksByIds;

export const tasksSelector = createSelector(
  getTasksIds,
  getTasks,
  (ids, tasks) => ids.map(id => tasks[id])
)

export const layoutsSelector = state => state.board.layouts;
