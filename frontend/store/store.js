import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import api from '../middleware/api';
import rootReducer from '../reducers/root_reducer';
import rootSaga from '../sagas/root_saga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, logger, sagaMiddleware)
  )
}

sagaMiddleware.run(rootSaga);

export default configureStore;
