import axios from 'axios';

export const UPDATE_LAYOUTS = 'BOARD::UPDATE_LAYOUTS';

export const updateLayouts = (layouts) => ({
  type: UPDATE_LAYOUTS,
  layouts
})
