import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { fetchTasks, updateTasks } from 'actions/task_actions';

import {
  currentUserSelector,
  tasksSelector,
  layoutsSelector,
  statusesSelector
} from 'reducers/selectors';

import Column from './column'
import Card from './card'

import style from './index.scss';


class Board extends Component {
  static propTypes = {
    currentUserId: PropTypes.number,
    currentUser: PropTypes.object,
    tasks: PropTypes.array,
    layouts: PropTypes.object,
    statuses: PropTypes.array,
  }

  state = { mounted: false }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUserId)
    this.setState({ mounted: true });
  }

  onLayoutChange = (layout, layouts) => {
    const tasks = this.getTasksData(layout)
    this.props.updateTasks(tasks)
  }

  getTasksData = (layout) => (
    layout.map((card) => ({
        id: card.i.split('-')[0],
        status: this.props.statuses[card.x],
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

    const columns = this.props.statuses.map(status => (
      <Column key={status} header={status} />
    ))

    return (
      <section className='board-container'>

        <div className='col-headers'>
          { columns }
        </div>

        {
          cards.length === this.props.layouts.lg.length &&
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
        }

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
    statuses: statusesSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: userId => dispatch(fetchTasks(userId)),
    updateTasks: tasks => dispatch(updateTasks(tasks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
