import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Header from 'components/header';
import SessionModal from 'components/session_modal';
import Board from 'components/board';
import Footer from 'components/footer';

const App = () => {
  return (
    <section id="app-container">
      <Header />
      <AuthRoute path="/login" component={SessionModal} />
      <AuthRoute path="/signup" component={SessionModal} />
      <ProtectedRoute exact path="/board" component={Board} />
      <Footer />
    </section>
  )
};

export default App;
