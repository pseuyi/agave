import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Landing from 'components/landing';
import Home from 'components/home';
import SessionModal from 'components/session_modal';
import TaskModal from 'components/task_modal';

const App = () => {
  return (
    <section id="app-container">
      <Route exact path="/" component={Landing}/>
      <AuthRoute path="/login" component={SessionModal} />
      <AuthRoute path="/signup" component={SessionModal} />
      <ProtectedRoute path="/home" component={Home} />
      <TaskModal />
    </section>
  )
};

export default App;
