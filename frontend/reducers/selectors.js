import { keyBy, orderBy } from 'lodash';
import { createSelector } from 'reselect';

export const currentUserSelector = state =>
  state.users.usersByIds[state.session.currentUser];

export const getTasksIds = state => state.tasks.ids;
export const getTasks = state => state.tasks.tasksByIds;

export const getTasksByStatus = createSelector(
  getTasks,
  (tasksById) => keyBy(tasksById, 'status')
);

export const makeStatusPrioritySelector = (status) => createSelector(
  getTasksByStatus,
  (tasksByStatus) => {
    tasksByStatus[status] ? orderBy(tasksByStatus[status], 'priority', 'asc') : {};
  }
);

export const getOpenTasks = makeStatusPrioritySelector('open');
export const getReadyTasks = makeStatusPrioritySelector('ready');
export const getInProgressTasks = makeStatusPrioritySelector('in progress');
export const getDoneTasks = makeStatusPrioritySelector('done');
