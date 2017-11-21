import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskEditForm from './task_edit_form';
import style from './index.scss';

import { editTask, deleteTask } from 'actions/task_actions';
import { disableTaskModal } from 'actions/modal_actions';
import { taskSelector } from 'reducers/selectors';

const TaskModal = (props) => {

  const handleSubmitEditTask = (values) => {
    props.editTask(values);
    handleDisableTaskModal();
  }

  const handleDeleteTask = () => {
    props.deleteTask(props.task.id);
    handleDisableTaskModal();
  }

  const handleDisableTaskModal = () => {
    props.disableTaskModal();
  }

  if (props.active) {
    return (
      <div className='task-modal-background'>
        <div className='task-modal-container'>
          <button
            className="disable-task-modal-button"
            type="disable"
            onClick={handleDisableTaskModal}>
            x
          </button>

          <TaskEditForm
            initialValues={props.task}
            onSubmit={handleSubmitEditTask}
          />

          <button
            className="delete-task-button"
            type="delete"
            onClick={handleDeleteTask}>
            delete
          </button>

        </div>
      </div>
      )
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  active: state.modal.active,
  task: taskSelector(state),
})

const mapDispatchToProps = dispatch => ({
  editTask: (task) => dispatch(editTask(task)),
  deleteTask: (id) => dispatch(deleteTask(id)),
  disableTaskModal: () => dispatch(disableTaskModal()),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal));
