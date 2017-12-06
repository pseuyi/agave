import { createSelector } from 'reselect';

export const currentUserSelector = state => state.getIn(['session', 'currentUser']);

export const getTasksIds = state => state.getIn(['tasks', 'ids']);
export const getTasks = state => state.getIn(['tasks', 'tasksByIds']);

export const tasksSelector = createSelector(
  getTasksIds,
  getTasks,
  (ids, tasks) => ids.map(id => tasks.get(id)),
);

export const taskSelector = state => {
  const taskId = state.getIn(['modal', 'taskId'], '');
  return state.getIn(['tasks', 'tasksByIds', taskId], null);
};

export const layoutsSelector = state => state.getIn(['board', 'layouts']);

const getNewTaskStatus = state => state.getIn(['form', 'newTask', 'values', 'status'], '');

export const newPrioritySelector = createSelector(
  getTasksIds,
  getTasks,
  getNewTaskStatus,
  (ids, tasksById, status) => {
    const tasks = ids.map(id => tasksById.get(id));
    return tasks.filter(task => task.get('status') === status).size + 1;
  },
);

export const statusesSelector = state => state.getIn(['board', 'statuses']);
