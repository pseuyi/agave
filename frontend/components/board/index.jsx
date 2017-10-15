import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { fetchTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  tasksSelector,
  tasksIdsSelector
} from 'reducers/selectors';

import Column from './column'

class Board extends Component {
  static propTypes = {
    tasks: PropTypes.object, // key tasks by status
    tasksIds: PropTypes.array,
    currentUserId: PropTypes.number,
    currentUser: PropTypes.object
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
  }

  filterTasks = (filter) => {
    const { tasks, tasksIds } = this.props;
    return tasksIds
            .filter(id => tasks[id].status === filter)
            .map(id => tasks[id])
            .sort((a, b) => a.priority - b.priority );
  }

  render () {
    let openTasks, readyTasks, inProgressTasks, doneTasks;

    if (this.props.tasks) {
      openTasks = this.filterTasks('open');
      readyTasks = this.filterTasks('ready');
      inProgressTasks = this.filterTasks('in progress');
      doneTasks = this.filterTasks('done');
    }

    return (
      <section style={{ color: 'black' }}>
        <h1>board</h1>
        <Column header='open' tasks={openTasks} />
        <Column header='ready' tasks={readyTasks} />
        <Column header='in progress' tasks={inProgressTasks} />
        <Column header='done' tasks={doneTasks} />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUser,
    currentUser: currentUserSelector(state),
    tasksIds: tasksIdsSelector(state),
    tasks: tasksSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: userId => dispatch(fetchTasks(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
