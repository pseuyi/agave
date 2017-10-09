import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'username required';
  if (!values.email) errors.email = 'email required';
  if (!values.password) errors.password = 'password required';

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor={label}>{label}:</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

let SessionForm = (props) => {
  const { handleSubmit, imagePreview, handleUpload, formType } = props;

    return (
      <div className="session-modal-container">
        <form onSubmit={handleSubmit}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="username"
          />

          {
            formType === 'sign up' &&
            <Field
              name="email"
              type="email"
              component={renderField}
              label="email"
            />
          }

          <Field
            name="password"
            type="password"
            component={renderField}
            label="password"
          />

          {
            formType === 'sign up' &&
            <div>
              <picture className="image-preview-container">
                {
                  imagePreview &&
                  <img src={imagePreview} alt="avatar" />
                }
              </picture>
              <input name="avatar" type="file" onChange={handleUpload} />
            </div>
          }

          <button type="submit">{formType}</button>
        </form>
      </div>
    )
}

SessionForm = reduxForm({
  form: 'session',
  validate
})(SessionForm)

export default SessionForm;
