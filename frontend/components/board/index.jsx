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

import style from './index.scss';

class Board extends Component {
  static propTypes = {
    tasks: PropTypes.object, // key tasks by status
    tasksIds: PropTypes.array,
    currentUserId: PropTypes.number,
    currentUser: PropTypes.object
  }

  constructor() {
    super()
    this.state = { width: 0 }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
    const width = this.boardElement.clientWidth;
    this.setState({ width });
    console.log('width', width)
    console.log('grid', width * 0.05)
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
      <section
        className='board-container'
        ref={boardElement => this.boardElement = boardElement}
      >
        <Column
          className='column open'
          header='open'
          tasks={openTasks}
          width={this.state.width}
        />

        <Column
          className='column ready'
          header='ready'
          tasks={readyTasks}
          width={this.state.width}
        />

        <Column
          className='column in-progress'
          header='in progress'
          tasks={inProgressTasks}
          width={this.state.width}
        />

        <Column
          className='column done'
          header='done'
          tasks={doneTasks}
          width={this.state.width}
        />

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
