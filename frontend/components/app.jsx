import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header/header';
import SessionModal from './session_modal/session_modal';

const App = () => {
  return (
    <section>
      <Header />
      <Route exact path="/login" component={ SessionModal } />
      <Route exact path="/signup" component={ SessionModal } />
    </section>
  )
};

export default App;
