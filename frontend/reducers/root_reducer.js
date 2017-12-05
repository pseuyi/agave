import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session_reducer';
import taskReducer from './task_reducer';
import boardReducer from './board_reducer';
import modalReducer from './modal_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  tasks: taskReducer,
  form: formReducer,
  board: boardReducer,
  modal: modalReducer,
});

export default rootReducer;
