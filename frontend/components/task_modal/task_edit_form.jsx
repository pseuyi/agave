import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 100%;
  margin-top: 10px;
  input {
    width: 80%;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
    margin: 0 10px;
  }
`

const TestArea = styled.textarea`
  width: 80%;
  height: 50%;
  padding: 0.4rem;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
`

const ButtonBox = styled.div`
  width: 80%;
`

const Button = styled.button`
  float: right;
  font-size: 16px;
  color: #000000;
  padding: 0.4rem 2rem;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
  &:hover {
    box-shadow: inset 3px 3px 10px rgba(0,0,0,0.1);
  }
`

const renderInputField = ({ input }) => (
  <TestArea {...input}></TestArea>
)

let TaskEditForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Field
        name="title"
        type="text"
        component="input"
        label="task title"
      />
      <Field
        name="description"
        type="text"
        component={renderInputField}
        label="description"
      />
      <ButtonBox>
        <Button
          type="submit">
          save
        </Button>
      </ButtonBox>
    </Form>
  )
}

TaskEditForm = reduxForm({
  form: 'editTask'
})(TaskEditForm)

export default TaskEditForm;
