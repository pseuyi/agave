import React from 'react';
import { Route } from 'react-router-dom';

import Header from 'components/header';
import SessionModal from 'components/session_modal';
import Board from 'components/board';

const App = () => {
  return (
    <section>
      <Header />
      <Route exact path="/login" component={ SessionModal } />
      <Route exact path="/signup" component={ SessionModal } />
      <Board />
    </section>
  )
};

export default App;
