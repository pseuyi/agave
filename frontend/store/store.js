import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import api from '../middleware/api';
import rootReducer from '../reducers/root_reducer';
import rootSaga from '../sagas/root_saga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
   const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger, api, sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga);
  return store;
}


export default configureStore;
