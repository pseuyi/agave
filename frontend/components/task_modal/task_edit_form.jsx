import React from 'react';
import { Field, reduxForm } from 'redux-form';

let TaskEditForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="title"
        type="text"
        component="input"
        label="task title"
      />
      <Field
        name="description"
        type="text"
        component="input"
        label="description"
      />
      <button
        className="edit-task-submit-button"
        type="submit">
        save
      </button>
    </form>
  )
}

TaskEditForm = reduxForm({
  form: 'editTask'
})(TaskEditForm)

export default TaskEditForm;
