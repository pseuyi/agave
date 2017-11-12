import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskForm from 'components/task_form';
import { addTask } from 'actions/task_actions';
import style from './index.scss';

export class Footer extends Component {

  handleAddTask = (values) => {
    this.props.addTask(this.props.userId, values);
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
  userId: state.session.currentUser,
})

const mapDispatchToProps = dispatch => ({
  addTask,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
