import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


let SessionForm = (props) => {
  const { handleSubmit } = props;

    return (
      <div className="session-modal-container">
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="username">username:</label>
            <Field name="username" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="email">email:</label>
            <Field name="email" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <Field name="password" component="input" type="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}

SessionForm = reduxForm({
  form: 'session'
})(SessionForm)

export default SessionForm;
