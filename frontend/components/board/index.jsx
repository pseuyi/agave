import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { fetchTasks } from 'actions/task_actions';
import { updateLayouts } from 'actions/board_actions';

import {
  currentUserSelector,
  tasksSelector,
  layoutsSelector
} from 'reducers/selectors';

import Column from './column'
import Card from './card'

import style from './index.scss';

const columnIndices = {
  'open': 0,
  'ready': 1,
  'in progress': 2,
  'done': 3,
}

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
      mounted: false,
    }
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId)
      .then((res) => this.buildInitialLayouts());
    this.setState({ mounted: true });
  }

  buildInitialLayouts = () => {
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

  getColIdx = (status) => columnIndices[status];

  onLayoutChange = (layout, layouts) => {
    this.props.updateLayouts(layouts);
  }

  render () {
    const cards = this.props.tasks.map(task => (
      <Card
        className='card-container'
        style=''
        key={`${task.id}-${task.title}`}
        title={task.title}
        description={task.description}
      />
    ));

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
