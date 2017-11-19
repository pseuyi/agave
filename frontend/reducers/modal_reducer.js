import * as actions from '../consts/action-types';

const defaultState = {
  active: false,
  taskId: null,
}

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ACTIVATE_TASK_MODAL:
      return { active: true, taskId: action.payload };
    case actions.DISABLE_TASK_MODAL:
      return defaultState;
    default:
      return state;
  }
}

export default modalReducer;
