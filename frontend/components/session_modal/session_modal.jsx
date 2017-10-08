import React, { Component } from 'react';
import SessionForm from './session_form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signUp, login } from '../../actions/session_actions';

class SessionModal extends Component {

  handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("user[username]", values.username);
    formData.append("user[password]", values.password);

    if (this.props.path === '/signup') {
      formData.append("user[email]", values.email);
      this.props.signUp(formData);
    } else {
      this.props.login(formData);
    }
  }

  render() {
    const formType = this.props.path.replace(/[^a-zA-Z0-9 ]/g, "");
    return (
      <div className="session-modal-container">
        <h2>{formType}</h2>
        <SessionForm onSubmit={this.handleSubmit} formType={ formType } />
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const { path } = match;
  return {
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
