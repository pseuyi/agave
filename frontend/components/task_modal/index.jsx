import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskEditForm from './task_edit_form';
import style from './index.scss';

import { editTask, deleteTask } from 'actions/task_actions';
import { taskSelector } from 'reducers/selectors';

const TaskModal = (props) => {

  const handleEditTask = (values) => {
    props.editTask(values);
  }

  const handleDeleteTask = () => {
    props.deleteTask(props.task.id);
  }

  return (
      <div className='task-modal-container'>
        <TaskEditForm
          onSubmit={handleEditTask}
          task={props.task}
        />

        <button
          className="delete-task-button"
          type="delete"
          onClick={handleDeleteTask}>
          delete task
        </button>
      </div>
  )
}

const mapStateToProps = (state, { match }) => ({
  task: taskSelector(state, match),
})

const mapDispatchToProps = dispatch => ({
  editTask: (task) => dispatch(editTask(task)),
  deleteTask: (id) => dispatch(deleteTask(id)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal));
