import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session_reducer';
import userReducer from './user_reducer';
import errorReducer from './error_reducer';
import taskReducer from './task_reducer';
import boardReducer from './board_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  tasks: taskReducer,
  form: formReducer,
  errors: errorReducer,
  board: boardReducer,
})

export default rootReducer;
