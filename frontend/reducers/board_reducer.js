import { UPDATE_LAYOUTS } from 'actions/board_actions';

const defaultState = {
  layouts: {}
}

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUTS:
      return { layouts: action.layouts };
    default:
      return state;
  }
}

export default boardReducer;
