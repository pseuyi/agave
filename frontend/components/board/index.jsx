import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  tasksSelector
} from 'reducers/selectors';

import Column from './column'

class Board extends Component {
  static propTypes = {
    tasks: PropTypes.object // key tasks by status
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
  }

  render () {
    return (
      <section>
        <h1>board</h1>
        <Column header='open'/>
        <Column header='ready'/>
        <Column header='in progress'/>
        <Column header='done'/>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUser,
    currentUser: currentUserSelector(state),
    tasks: tasksSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: userId => dispatch(fetchTasks(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
