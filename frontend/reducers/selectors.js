import { createSelector } from 'reselect';

export const currentUserSelector = state =>
  state.users.usersByIds[state.session.currentUser];

export const tasksIdsSelector = state => state.tasks.ids;
export const tasksSelector = state => state.tasks.tasksByIds;
