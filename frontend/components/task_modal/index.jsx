import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { editTask, deleteTask } from 'actions/task_actions';
import { disableTaskModal } from 'actions/modal_actions';
import { taskSelector } from 'reducers/selectors';

import TaskEditForm from './task_edit_form';

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
`

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 54%;
  left: 50%;
  width: 40%;
  height: 50%;
  transform: translateX(-50%) translateY(-50%);
  &::after {
    content: "";
    background: url('/assets/still-background.png');
    background-position: center;
    opacity: 0.9;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    border-radius: 1%;
    z-index: -1;
  }
`
const DisableModalButton = styled.button`
  font-size: 16px;
  line-height: 16px;
  color: #000000;
  margin: 6px 10px;
`

const Button = styled.button`
  font-size: 16px;
  text-align: center;
  color: #000000;
  padding: 0.4rem 2rem;
  width: 60px;
  margin: 0 0 5% 10%;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
  &:hover {
    box-shadow: inset 3px 3px 10px rgba(0,0,0,0.1);
  }
`

const TaskModal = (props) => {

  const handleSubmitEditTask = (values) => {
    props.editTask(values.toJS());
    handleDisableTaskModal();
  }

  const handleDeleteTask = () => {
    props.deleteTask(props.task.get('id'));
    handleDisableTaskModal();
  }

  const handleDisableTaskModal = () => {
    props.disableTaskModal();
  }

  if (props.active) {
    console.log('task modal: ', props.task);
    return (
      <ModalBackground>
        <ModalContainer>
          <DisableModalButton
            type="disable"
            onClick={handleDisableTaskModal}>
            x
          </DisableModalButton>

          <TaskEditForm
            initialValues={props.task}
            onSubmit={handleSubmitEditTask}
          />

          <Button
            type="delete"
            onClick={handleDeleteTask}>
            delete
          </Button>

        </ModalContainer>
      </ModalBackground>
      )
  } else {
    return null;
  }
};

const mapStateToProps = state => ({
  active: state.getIn(['modal', 'active']),
  task: taskSelector(state),
});

const mapDispatchToProps = dispatch => ({
  editTask: task => dispatch(editTask(task)),
  deleteTask: id => dispatch(deleteTask(id)),
  disableTaskModal: () => dispatch(disableTaskModal()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskModal));
