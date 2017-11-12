import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { fetchTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  tasksSelector,
} from 'reducers/selectors';

import { getCol } from '../../util/board_util';

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

    this.props.tasks.forEach((task) => {
      console.log(task);
      layout.push({
        i: `${task.id}-${task.title}`,
        x: getCol(task.status),
        y: task.priority - 1,
        w: 1,
        h: 1,
        isResizable: false,
      })
    })

    this.setState({
      layouts: { lg: layout }
    })
  }

  onLayoutChange = (layout, layouts) => {
    this.setState({ layouts });
  }

  render () {
    console.log('layout: ', this.state.layouts.lg);

    const cards = this.props.tasks.map(task => (
      <Card
        className='card-container'
        style=''
        key={`${task.id}-${task.title}`}
        title={task.title}
        description={task.description}
      />
    ))

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
          onLayoutChange={this.onLayoutChange}
          breakpoints={{ lg: 1000 }}
          cols={{ lg: 4 }}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          >

          { cards }

        </ResponsiveReactGridLayout>
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
