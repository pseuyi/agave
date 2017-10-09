import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let SessionForm = (props) => {
  const { handleSubmit, imagePreview, handleUpload, formType } = props;

    return (
      <div className="session-modal-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username:</label>
            <Field name="username" component="input" type="text" />
          </div>

          {
            formType === 'sign up' &&
            <div>
              <label htmlFor="email">email:</label>
              <Field name="email" component="input" type="text" />
            </div>
          }

          <div>
            <label htmlFor="password">password:</label>
            <Field name="password" component="input" type="password" />
          </div>

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
  form: 'session'
})(SessionForm)

export default SessionForm;
