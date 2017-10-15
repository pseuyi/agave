import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', () => {
  let preloadedState;

  if (localStorage['currentUser']) {
    const data = JSON.parse(localStorage['currentUser']);

    preloadedState = {
      session: {
        currentUser: parseInt(data.id)
      },
      users: {
        usersByIds: {
          [data.id]: data.attributes
        }
      }
    }
  }

  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
})
