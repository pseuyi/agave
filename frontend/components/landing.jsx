import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SessionModal from 'components/session_modal';
import { login } from 'actions/session_actions';

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

class Landing extends Component {

  handleClick = (e) => {
    e.preventDefault();
    const data = {
      username: 'garry',
      password: 'carrot'
    };
    this.props.demoLogin(data);
  }

  render () {
    const { loggedIn, history } = this.props;
    if (loggedIn) history.push("/home");
    return (
      <Modal>
        <h1>agave</h1>
        <Links>
          <Link to="/login">login</Link>/<Link to="/signup">signup</Link>
          <p><button onClick={this.handleClick}>demo</button></p>
        </Links>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
})

const mapDispatchToProps = (dispatch) => ({
  demoLogin: login,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
