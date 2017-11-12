import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { fetchTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  getOpenTasks,
  getReadyTasks,
  getInProgressTasks,
  getDoneTasks,
} from 'reducers/selectors';

import Column from './column'
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
      mounted: false,
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId);
    this.setState({ mounted: true });
    this.buildLayout();
  }

  buildLayout = () => {
    const layout = []
    const { openTasks, readyTasks, inProgressTasks, doneTasks } = this.props;
    const taskCols = [openTasks, readyTasks, inProgressTasks, doneTasks];
    const cards = [];

    taskCols.forEach( (tasks, colIdx) => {
      tasks.forEach( (task, i) => {
        layout.push({
          i: `${colIdx}-${i}-${task.title}`,
          x: colIdx,
          y: i,
          w: 1,
          h: 1,
          maxH: 2,
          maxW: 1,
        })

        cards.push(
          <Card
            className='card-container'
            style=''
            key={`${colIdx}-${i}-${task.title}`}
            title={task.title}
            description={task.description}
          />
        )
      })
    })

    this.setState({
      layouts: { lg: layout },
      cards
    })
  }

  render () {

    return (
      <section className='board-container'>

        <div className='col-headers'>
          <Column header='open' />
          <Column header='ready' />
          <Column header='in progress' />
          <Column header='done' />
        </div>

        <ResponsiveReactGridLayout
          style={{ width: '100%' }}
          layouts={this.state.layouts}
          breakpoints={{ lg: 1000 }}
          cols={{ lg: 4 }}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          >

          { this.state.cards }

        </ResponsiveReactGridLayout>
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
