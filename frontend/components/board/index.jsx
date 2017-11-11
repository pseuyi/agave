import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { fetchTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  getOpenTasks,
  getReadyTasks,
  getInProgressTasks,
  getDoneTasks,
} from 'reducers/selectors';

import Column from './column'

import style from './index.scss';

class Board extends Component {
  static propTypes = {
    openTasks: PropTypes.array,
    readyTasks: PropTypes.array,
    inProgressTasks: PropTypes.array,
    doneTasks: PropTypes.array,
    currentUserId: PropTypes.number,
    currentUser: PropTypes.object
  }

  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
  }

  render () {
    const { openTasks, readyTasks, inProgressTasks, doneTasks } = this.props;

    return (
      <section
        className='board-container'
        ref={boardElement => this.boardElement = boardElement}
      >
        <Column
          className='column open'
          header='open'
          tasks={openTasks}
        />

        <Column
          className='column ready'
          header='ready'
          tasks={readyTasks}
        />

        <Column
          className='column in-progress'
          header='in progress'
          tasks={inProgressTasks}
        />

        <Column
          className='column done'
          header='done'
          tasks={doneTasks}
        />

      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUser,
    currentUser: currentUserSelector(state),
    openTasks: getOpenTasks(state),
    readyTasks: getReadyTasks(state),
    inProgressTasks: getInProgressTasks(state),
    doneTasks: getDoneTasks(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: userId => dispatch(fetchTasks(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
