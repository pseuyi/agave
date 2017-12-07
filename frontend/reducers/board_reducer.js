import { Map, List } from 'immutable';
import * as BoardUtil from '../util/board_util';

export const UPDATE_LAYOUTS = 'BOARD::UPDATE_LAYOUTS';
export const BUILD_LAYOUTS = 'BOARD::BUILD_LAYOUTS';
export const ADD_LAYOUT = 'BOARD::ADD_LAYOUT';
export const REMOVE_LAYOUT = 'BOARD::REMOVE_LAYOUT';

export const updateLayouts = layouts => ({ type: UPDATE_LAYOUTS, layouts });
export const buildLayouts = payload => ({ type: BUILD_LAYOUTS, payload });
export const addLayout = payload => ({ type: ADD_LAYOUT, payload });
export const removeLayout = payload => ({ type: REMOVE_LAYOUT, payload });

const defaultState = Map({
  layouts: Map({ lg: List() }),
  statuses: List(['open', 'ready', 'in progress', 'done']),
});

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LAYOUTS:
      return state.set('layouts', Map(action.layouts));

    case BUILD_LAYOUTS: {
      if (!action.payload || action.payload.length === 0) {
        return state.setIn(['layouts', 'lg'], List());
      }
      const builtLayouts = List(BoardUtil.buildLayouts(state, BoardUtil.denormalized(action.payload)));
      return state.set('layouts', Map({ lg: builtLayouts }));
    }

    case ADD_LAYOUT: {
      const newLayoutItem = BoardUtil.buildTaskLayout(state, ...BoardUtil.denormalized(action.payload));
      const newLgLayout = state.getIn(['layouts', 'lg']).push(Map(newLayoutItem));
      return state.setIn(['layouts', 'lg'], newLgLayout);
    }

    case REMOVE_LAYOUT: {
      const task = action.payload[0];
      const newLgLayout = state
        .getIn(['layouts', 'lg'])
        .filterNot(layout => layout.get('i') === `${task.id}-${task.title}`);
      return state.setIn(['layouts', 'lg'], newLgLayout);
    }

    default:
      return state;
  }
};

export default boardReducer;
