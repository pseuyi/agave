import { createSelecor } from 'reselect';

export const currentUserSelector = state =>
  state.users.usersByIds[state.session.currentUser];

export const tasksSelector = state => state.tasks.tasksByIds;
