import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SessionModal from 'components/session_modal';

const Modal = styled.section`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 440px;
  height: 260px;
  background: rgba(255, 255, 255, 0);
  padding: 4rem;
  border: 1px solid black;
  border-radius: 3px;
  text-align: center;
  h1 {
    font-size: 8rem;
    color: #1bd68e;
    font-weight: lighter;
    font-style: oblique;
    font-family: 'BodoniXT';
    letter-spacing: 10px;
    margin-bottom: 2rem;
  }
`
const Links = styled.div`
  font-family: 'Arial', sans-serif;
  font-size: 2.4rem;
  color: #1bd68e;
`

const Landing = ({ loggedIn, history }) => {
  if (loggedIn) history.push("/home")
  return (
    <Modal>
      <h1>agave</h1>
      <Links>
        <Link to="/login">login</Link>/<Link to="/signup">signup</Link>
      </Links>
    </Modal>
  )
};

const mapStateToProps = state => ({
  loggedIn: Boolean(state.getIn(['session', 'currentUser'])),
});

export default withRouter(connect(mapStateToProps, null)(Landing));
