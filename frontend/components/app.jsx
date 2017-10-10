import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Header from 'components/header';
import SessionModal from 'components/session_modal';
import Board from 'components/board';

const App = () => {
  return (
    <section id="app-container">
      <Header />
      <AuthRoute path="/login" component={SessionModal} />
      <AuthRoute path="/signup" component={SessionModal} />
      <ProtectedRoute path="/board" component={Board} />
    </section>
  )
};

export default App;
