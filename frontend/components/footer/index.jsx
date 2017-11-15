import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskForm from 'components/task_form';
import { createTask } from 'actions/task_actions';
import { tasksSelector } from 'reducers/selectors';
import { getLastPriority } from '../../util/task_util';
import style from './index.scss';

export class Footer extends Component {
  static propTypes = {
    tasks: PropTypes.array,
  }

  handleAddTask = (values) => {
    values['priority'] = getLastPriority(values['status'], this.props.tasks)
    this.props.createTask(values);
  }

  render () {
    return (
      <footer className="footer">
        <TaskForm onSubmit={this.handleAddTask}/>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  tasks: tasksSelector(state),
})

const mapDispatchToProps = dispatch => ({
  createTask: (id, values) => dispatch(createTask(id, values)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
