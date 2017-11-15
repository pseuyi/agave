import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SessionModal from 'components/session_modal';

const Landing = ({ loggedIn, history }) => {
  if (loggedIn) history.push("/home")
  return (
    <section>
      <h1>WELCOM TO AGAVE</h1>
      <Link to="/login">LOGIN</Link>
    </section>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser)
})

export default withRouter(connect(mapStateToProps, null)(Landing));
