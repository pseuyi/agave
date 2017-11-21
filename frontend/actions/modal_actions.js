import * as actions from '../consts/action-types';

export const activateTaskModal = (payload) => ({
  type: actions.ACTIVATE_TASK_MODAL,
  payload
})

export const disableTaskModal = () => ({
  type: actions.DISABLE_TASK_MODAL
})
