import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { fetchTasks, updateTasks } from 'actions/task_actions';
import { updateLayouts } from 'actions/board_actions';

import {
  currentUserSelector,
  tasksSelector,
  layoutsSelector
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

  state = { mounted: false }
  statuses = ['open', 'ready', 'in progress', 'done'];

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId)
      .then(this.buildInitialLayouts);
    this.setState({ mounted: true });
  }

  buildInitialLayouts = () => {
    console.log('building layoutes')
    const layout = this.props.tasks.map((task) => ({
        i: `${task.id}-${task.title}`,
        x: this.getColIdx(task.status),
        y: task.priority - 1,
        w: 1,
        h: 1,
        isResizable: false,
      })
    );

    this.props.updateLayouts({ lg: layout });
  }

  getColIdx = (status) => {
    this.statuses.indexOf(status);
  }

  onLayoutChange = (layout, layouts) => {
    const tasks = this.getTasksData(layout)
    this.props.updateTasks(tasks)
      .then(() => this.props.updateLayouts(layouts))
  }

  getTasksData = (layout) => (
    layout.map((card) => ({
        id: card.i.split('-')[0],
        status: this.statuses[card.x],
        priority: card.y + 1,
      })
    )
  )

  render () {
    if (!this.props.layouts.lg) return null;

    const cards = this.props.tasks.map(task => (
      <Card
        className='card-container'
        style=''
        key={`${task.id}-${task.title}`}
        title={task.title}
        description={task.description}
      />
    ));

    const columns = this.statuses.map(status => (
      <Column key={status} header={status} />
    ))

    return (
      <section className='board-container'>

        <div className='col-headers'>
          { columns }
        </div>

        <ResponsiveReactGridLayout
          style={{ width: '100%' }}
          layouts={this.props.layouts}
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
    layouts: layoutsSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: userId => dispatch(fetchTasks(userId)),
    updateLayouts: layouts => dispatch(updateLayouts(layouts)),
    updateTasks: tasks => dispatch(updateTasks(tasks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
