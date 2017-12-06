import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';

import SessionForm from './session_form';
import GoogLogin from './login';

import { signUp, login } from '../../actions/session_actions';

import style from './index.scss';

class SessionModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: null,
      imagePreview: null
     }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn) newProps.history.push('/home')
  }

  handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("user[username]", values.get('username'));
    formData.append("user[password]", values.get('password'));

    if (this.props.path === '/signup') {
      if (this.state.avatar) formData.append("user[avatar]", this.state.avatar);
      formData.append("user[email]", values.get('email'));
      this.props.signUp(formData)
    } else {
      this.props.login(formData)
    }
  }

  handleSubmitAsGuest = () => {
    const values = Map({
      username: 'guest',
      password: 'carrot'
    });

    this.handleSubmit(values);
  }

  handleUpload = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: file,
        imagePreview: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  render() {
    const formType = this.props.path === '/login' ? 'login' : 'sign up';
    const loginLink = formType === 'login' ? <u>login</u>: 'login'
    const signupLink = formType === 'login' ? 'signup': <u>signup</u>
    return (
      <div className="session-modal-container">
        <div className="session-modal">
          <div className="route-button">
            <Link to="/login">{loginLink}</Link>
            {' / '}
            <Link to="/signup">{signupLink}</Link>
          </div>
          <h2>{formType}</h2>
          <SessionForm
            onSubmit={this.handleSubmit}
            handleUpload={this.handleUpload}
            imagePreview={this.state.imagePreview}
            formType={formType}
            errors={this.props.errors}
            />

          <GoogLogin login={this.props.login} />

          {
            formType === 'login' &&
              <button
                className="demo-button"
                type="submit"
                onClick={this.handleSubmitAsGuest}>
                demo
              </button>

          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const { path } = match;
  return {
    loggedIn: !!state.getIn(['session', 'currentUser']),
    errors: state.errors,
    path
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (formData) => dispatch(signUp(formData)),
    login: (formData) => dispatch(login(formData)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionModal)
);
