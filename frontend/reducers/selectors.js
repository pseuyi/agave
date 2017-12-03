import { get } from 'lodash';
import { createSelector } from 'reselect';

export const currentUserSelector = state =>
  state.users.usersByIds[state.session.currentUser];

export const getTasksIds = state => state.tasks.ids;
export const getTasks = state => state.tasks.tasksByIds;

export const tasksSelector = createSelector(
  getTasksIds,
  getTasks,
  (ids, tasks) => ids.map(id => tasks.get(id)),
);

export const taskSelector = state => {
  return state.tasks.tasksByIds.get(state.modal.taskId);
};

export const layoutsSelector = state => state.board.layouts;

const getNewTaskStatus = state => get(state.form, 'newTask.values.status', '');

export const newPrioritySelector = createSelector(
  getTasksIds,
  getTasks,
  getNewTaskStatus,
  (ids, tasksById, status) => {
    const tasks = ids.map(id => tasksById.get(id));
    return tasks.filter(task => task.get('status') === status).length + 1;
  },
);

export const statusesSelector = state => state.board.statuses;
