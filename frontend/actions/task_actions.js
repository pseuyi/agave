import * as actions from '../consts/action-types';

export const fetchTasks = () => ({ type: actions.FETCH_TASKS_REQUEST });

export const updateTasks = tasks => ({ type: actions.UPDATE_TASKS_REQUEST, tasks });

export const createTask = task => ({ type: actions.CREATE_TASK_REQUEST, task });

export const editTask = task => ({ type: actions.EDIT_TASK_REQUEST, task });

export const deleteTask = id => ({ type: actions.DELETE_TASK_REQUEST, id });
