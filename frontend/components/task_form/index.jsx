import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './index.scss';

const renderInputField = ({ input, label, name, type, meta: { touched, error } }) => (
  <div className="add-task-form-field">
    <div className="add-task-input">
      <input  {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

let TaskForm = ({ handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={renderInputField}
        type="text"
        label="task title"
      />
      <Field
        name="description"
        component={renderInputField}
        type="text"
        label="description"
      />
      <div className="add-task-input">
        <label htmlFor="status">status</label>
        <Field name="status" component="select" type="text">
          <option></option>
          <option name="open">open</option>
          <option name="ready">ready</option>
          <option name="in progress">in progress</option>
          <option name="done">done</option>
        </Field>
      </div>
      <div className="add-task-button-container" >
        <button
          className="add-task-button"
          type="submit">
          add task
        </button>
      </div>
    </form>
  )
}

TaskForm = reduxForm({
  form: 'newTask'
})(TaskForm);

export default TaskForm;
