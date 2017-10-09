import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from './session_reducer';
import userReducer from './user_reducer';
import errorReducer from './error_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  form: formReducer,
  errors: errorReducer,
})

export default rootReducer;
