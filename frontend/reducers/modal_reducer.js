import { Map } from 'immutable';

export const ACTIVATE_TASK_MODAL = 'MODAL::ACTIVATE_TASK_MODAL';
export const DISABLE_TASK_MODAL = 'MODAL::DISABLE_TASK_MODAL';

export const activateTaskModal = payload => ({ type: ACTIVATE_TASK_MODAL, payload });
export const disableTaskModal = () => ({ type: DISABLE_TASK_MODAL });


const defaultState = Map({
  active: false,
  taskId: null,
});

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIVATE_TASK_MODAL:
      return state
        .set('active', true)
        .set('taskId', action.payload);

    case DISABLE_TASK_MODAL:
      return state
        .set('active', false)
        .set('taskId', null);

    default:
      return state;
  }
};

export default modalReducer;
