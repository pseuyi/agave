import { Map } from 'immutable';
import * as actions from '../consts/action-types';

const defaultState = Map({
  active: false,
  taskId: null,
});

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ACTIVATE_TASK_MODAL:
      return state
        .set('active', true)
        .set('taskId', action.payload);

    case actions.DISABLE_TASK_MODAL:
      return state
        .set('active', false)
        .set('taskId', null);

    default:
      return state;
  }
};

export default modalReducer;
