import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Responsive, WidthProvider }  from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

import { fetchTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  getOpenTasks,
  getReadyTasks,
  getInProgressTasks,
  getDoneTasks,
} from 'reducers/selectors';

// import Column from './column'
import Card from './card'

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

    this.state = {
      layouts: {
        lg: []
      },
      cards: [],
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
    this.buildLayout();
  }

  buildLayout = () => {
    const layout = []
    const { openTasks, readyTasks, inProgressTasks, doneTasks } = this.props;

    const cards = openTasks.map( (task, i) => {
      layout.push({
        i: `${i}-${task.title}`,
        x: 0, y: i, w: 1, h: 1
      })

      return (
        <Card
          key={`${i}-${task.title}`}
          title={task.title}
          description={task.description}
        />
      )
    })

    this.setState({
      layouts: { lg: layout },
      cards
    })
  }

  render () {
    console.log('state: ', this.state)
    
    return (
      <ResponsiveGridLayout
        className='layout'
        layouts={this.state.layouts}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 4 }}
        >

        { this.state.cards }

      </ResponsiveGridLayout>
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
