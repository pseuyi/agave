import * as actions from '../consts/action-types';

export const updateLayouts = (layouts) => ({
  type: actions.UPDATE_LAYOUTS,
  layouts
})

export const buildLayouts = (payload) => ({
  type: actions.BUILD_LAYOUTS,
  payload
})

export const addLayout = (payload) => ({
  type: actions.ADD_LAYOUT,
  payload
})

export const removeLayout = (payload) => ({
  type: actions.REMOVE_LAYOUT,
  payload
})
