import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  const req = 'required';

  if (!values.username) errors.username = req;
  if (!values.email) errors.email = req;
  if (!values.password) errors.password = req;

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="session-form-field">
    <div className="session-form-input">
      <input  {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

let SessionForm = (props) => {

  const {
    handleSubmit,
    imagePreview,
    handleUpload,
    formType,
    errors
  } = props;

    return (
      <div className="session-form-container">
        <form onSubmit={handleSubmit}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="username"
            placeholder="aksdjfak;sdjf"
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

          { errors && <span>{errors}</span> }

          <button id="session-submit-button" type="submit">{formType}</button>
        </form>
      </div>
    )
}

SessionForm = reduxForm({
  form: 'session',
  validate
})(SessionForm)

export default SessionForm;
