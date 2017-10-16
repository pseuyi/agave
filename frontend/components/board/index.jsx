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
    openTasks: PropTypes.object,
    readyTasks: PropTypes.object,
    inProgressTasks: PropTypes.object,
    doneTasks: PropTypes.object,
    currentUserId: PropTypes.number,
    currentUser: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      width: 0
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
    const width = this.boardElement.clientWidth;
    this.setState({ width });
  }

  render () {
    const { openTasks, readyTasks, inProgressTasks, doneTasks } = this.props;
    const { width } = this.state;
    return (
      <section
        className='board-container'
        ref={boardElement => this.boardElement = boardElement}
      >
        <Column
          className='column open'
          header='open'
          tasks={openTasks}
          width={width}
          bounds={{left: 0, right: width * 0.75}}
        />

        <Column
          className='column ready'
          header='ready'
          tasks={readyTasks}
          width={width}
          bounds={{left: width * -0.25, right: width * 0.5}}
        />

        <Column
          className='column in-progress'
          header='in progress'
          tasks={inProgressTasks}
          width={width}
          bounds={{left: width * -0.5, right: width * 0.25}}
        />

        <Column
          className='column done'
          header='done'
          tasks={doneTasks}
          width={width}
          bounds={{left: width * -0.75, right: 0}}
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
