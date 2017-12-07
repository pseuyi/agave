import { Map, Set, fromJS } from 'immutable';

export const FETCH_TASKS_REQUEST = 'TASK::FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'TASK::FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'TASK::FETCH_TASKS_ERROR';
export const UPDATE_TASKS_REQUEST = 'TASK::UPDATE_TASKS_REQUEST';
export const UPDATE_TASKS_SUCCESS = 'TASK::UPDATE_TASKS_SUCCESS';
export const UPDATE_TASKS_ERROR = 'TASK::UPDATE_TASKS_ERROR';
export const CREATE_TASK_REQUEST = 'TASK::CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'TASK::CREATE_TASK_SUCCESS';
export const CREATE_TASK_ERROR = 'TASK::CREATE_TASK_ERROR';
export const EDIT_TASK_REQUEST = 'TASK::EDIT_TASK_REQUEST';
export const EDIT_TASK_SUCCESS = 'TASK::EDIT_TASK_SUCCESS';
export const EDIT_TASK_ERROR = 'TASK::EDIT_TASK_ERROR';
export const DELETE_TASK_REQUEST = 'TASK::DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'TASK::DELETE_TASK_SUCCESS';
export const DELETE_TASK_ERROR = 'TASK::DELETE_TASK_ERROR';

export const fetchTasks = () => ({ type: FETCH_TASKS_REQUEST });
export const updateTasks = tasks => ({ type: UPDATE_TASKS_REQUEST, tasks });
export const createTask = task => ({ type: CREATE_TASK_REQUEST, task });
export const editTask = task => ({ type: EDIT_TASK_REQUEST, task });
export const deleteTask = id => ({ type: DELETE_TASK_REQUEST, id });


const defaultState = Map({
  tasksByIds: Map(),
  ids: Set(),
  error: '',
});

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
    case UPDATE_TASKS_SUCCESS:
      if (!action.payload || action.payload.length === 0) {
        return state
          .set('tasksByIds', Map())
          .set('ids', Set())
          .set('error', '');
      }
      return state
        .set('tasksByIds', fromJS(action.payload.entities.tasks))
        .set('ids', Set(action.payload.result.tasks).sort((a, b) => a - b)) // sort so order is the same as layouts
        .set('error', '');

    case CREATE_TASK_SUCCESS:
    case EDIT_TASK_SUCCESS: {
      const mergedTasks = state.get('tasksByIds').merge(action.payload.entities.tasks);
      const addedIds = state.get('ids').add(action.payload.result.tasks[0]);
      return state
        .set('tasksByIds', mergedTasks)
        .set('ids', addedIds)
        .set('error', '');
    }

    case DELETE_TASK_SUCCESS: {
      const task = action.payload[0];
      const removedTasks = state.get('tasksByIds').delete(task.id);
      const removedIds = state.get('ids').delete(task.id);
      return state
        .set('tasksByIds', removedTasks)
        .set('ids', removedIds)
        .set('error', '');
    }

    case FETCH_TASKS_ERROR:
    case UPDATE_TASKS_ERROR:
    case CREATE_TASK_ERROR:
    case DELETE_TASK_ERROR:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export default taskReducer;
