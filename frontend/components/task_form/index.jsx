import React, { Component } from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

const Form = styled.form`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 70%;
  min-width: 860px;
  margin: 1rem 0;
`
const FormField = styled.div`
  padding: 0.4rem 0;
  height: 1rem;
  width: 240px;
  border-bottom: 1px solid black;
`
const Select = styled.div`
  padding: 0.4rem 0;
  select {
    font-size: 16px;
  	line-height: normal;
  	position: relative;
    margin-left: 0.4rem;
    background-color: transparent;
  	background-position: right 10px top 50%;
  	background-repeat: no-repeat;
    &:focus {
      outline:none
    }
  }
`
const Button = styled.button`
  font-size: 16px;
  color: #000000;
  border: 1px solid #1bd68e;
  padding: 0.4rem 2rem;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
  &:hover {
    box-shadow: inset 3px 3px 10px rgba(0,0,0,0.1);
  }
`

const renderInputField = ({ input, label, name, type, meta: { touched, error } }) => (
  <FormField className="add-task-form-field">
    <input  {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </FormField>
)

let TaskForm = ({ handleSubmit }) => {

  return (
    <Form onSubmit={handleSubmit}>
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
      <Select>
        <label htmlFor="status">status  </label>
        <Field name="status" component="select" type="text">
          <option name="open">open</option>
          <option name="ready">ready</option>
          <option name="in progress">in progress</option>
          <option name="done">done</option>
        </Field>
      </Select>
      <Button
        className="add-task-button"
        type="submit">
        add task
      </Button>
    </Form>
  )
}

TaskForm = reduxForm({
  form: 'newTask'
})(TaskForm);

export default TaskForm;
