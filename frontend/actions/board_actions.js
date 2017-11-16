
export const UPDATE_LAYOUTS = 'BOARD::UPDATE_LAYOUTS';
export const BUILD_LAYOUTS = 'BOARD::BUILD_LAYOUTS';
export const ADD_LAYOUT = 'BOARD::ADD_LAYOUT';

export const updateLayouts = (layouts) => ({
  type: UPDATE_LAYOUTS,
  layouts
})

export const buildLayouts = (payload) => ({
  type: BUILD_LAYOUTS,
  payload
})

export const addLayout = (payload) => ({
  type: ADD_LAYOUT,
  payload
})
