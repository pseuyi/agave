import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskForm from 'components/task_form';
import { createTask } from 'actions/task_actions';
import { newPrioritySelector } from 'reducers/selectors';
import style from './index.scss';

export class Footer extends Component {
  static propTypes = {
    tasks: PropTypes.array,
  }

  handleAddTask = (values) => {
    values['priority'] = this.props.newPriority;
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
  newPriority: newPrioritySelector(state),
})

const mapDispatchToProps = dispatch => ({
  createTask: (id, values) => dispatch(createTask(id, values)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
