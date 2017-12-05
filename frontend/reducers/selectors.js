import { get, map, filter } from 'lodash';
import { createSelector } from 'reselect';

export const currentUserSelector = state =>
  state.users.usersByIds.get(state.session.currentUser.toString());

export const getTasksIds = state => state.tasks.ids.toJS();
export const getTasks = state => state.tasks.tasksByIds.toJS();

export const tasksSelector = createSelector(
  getTasksIds,
  getTasks,
  (ids, tasks) => map(ids, id => tasks[id]),
);

export const taskSelector = state => {
  if (state.modal.taskId) {
    return state.tasks.tasksByIds.get(state.modal.taskId.toString()).toJS()
  }
};

export const layoutsSelector = state => state.board.layouts.toJS();

const getNewTaskStatus = state => get(state.form, 'newTask.values.status', '');

export const newPrioritySelector = createSelector(
  getTasksIds,
  getTasks,
  getNewTaskStatus,
  (ids, tasksById, status) => {
    const tasks = map(ids, id => tasksById[id]);
    return filter(tasks, task => task.status === status).length + 1;
  },
);

export const statusesSelector = state => state.board.statuses;
