import React, { Component } from 'react';
import SessionForm from './session_form';
import { connect } from 'react-redux';
import { signUp } from '../../actions/session_actions';

class SessionModal extends Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const formData = new FormData();
    formData.append("user[username]", values.username);
    formData.append("user[email]", values.email);
    formData.append("user[password]", values.password);

    this.props.signUp(formData);
  }

  render() {
    return (
      <div className="session-modal-container">
        <SessionForm onSubmit={ this.submit } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (formData) => dispatch(signUp(formData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionModal);
