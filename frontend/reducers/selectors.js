import { groupBy, orderBy, get, filter, map } from 'lodash';
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

const getNewTaskStatus = state => get(state.form, 'newTask.values.status', '');

export const newPrioritySelector = createSelector(
  getTasksIds,
  getTasks,
  getNewTaskStatus,
  (ids, tasksById, status) => {
    const tasks = map(ids, id => tasksById[id]);
    return filter(tasks, (task) => task.status === status ).length + 1;
  }
)

export const getLastPriority = (status, tasks) => {
  let priority = 1
  tasks.forEach(task => {
    if (task.status === status) priority += 1
  })
  return priority;
}
