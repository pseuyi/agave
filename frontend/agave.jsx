import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { getPreloadedState } from './util/session_util';


document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = getPreloadedState();
  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
})
