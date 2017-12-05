import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { map, isEqual } from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { fetchTasks, updateTasks } from 'actions/task_actions';
import { activateTaskModal } from 'actions/modal_actions';

import {
  currentUserSelector,
  tasksSelector,
  layoutsSelector,
  statusesSelector
} from 'reducers/selectors';

import TaskModal from 'components/task_modal';
import Column from './column'
import Card from './card'

import style from './index.scss';


class Board extends Component {
  static propTypes = {
    currentUser: ImmutablePropTypes.map.isRequired,
    tasks: ImmutablePropTypes.set,
    layouts: ImmutablePropTypes.map,
    statuses: ImmutablePropTypes.list,
  }

  state = { mounted: false }

  componentDidMount() {
    this.props.fetchTasks(this.props.currentUser.id)
    this.setState({ mounted: true });
  }

  onLayoutChange = (layout, layouts) => {
    const tasks = this.getTasksData(layout)
    this.props.updateTasks(tasks)
  }

  getTasksData = (layout) => {
    return (
    layout.map(card => ({
        id: card.i.split('-')[0],
        status: this.props.statuses.get(card.x),
        priority: card.y + 1,
      })
    )
  )}

  handleEditTaskModal = (id) => {
    this.props.activateTaskModal(id);
  }

  render () {
    if (!this.props.layouts.get('lg')) return null;

    const layouts = this.props.layouts.toJS();

    const cards = this.props.tasks.map(task => (
        <Card
          className='card-container'
          style=''
          key={`${task.get('id')}-${task.get('title')}`}
          task={task.toJS()}
          handleEditTaskModal={this.handleEditTaskModal}
        />
      )
    ).toArray();

    const columns = this.props.statuses.map(status => (
      <Column key={status} header={status} />
    )).toArray();

    return (
      <section className='board-container'>

        <div className='col-headers'>
          { columns }
        </div>

        {
          cards.length === layouts.lg.length &&
          <ResponsiveReactGridLayout
            style={{ width: '100%', height: '90%', overflowY: 'scroll' }}
            layouts={layouts}
            onLayoutChange={this.onLayoutChange}
            breakpoints={{ lg: 1000 }}
            cols={{ lg: 4 }}
            measureBeforeMount={true}
            useCSSTransforms={this.state.mounted}
            draggableCancel='.non-draggable-element'
            >

            { cards }

          </ResponsiveReactGridLayout>
        }

        <TaskModal />

      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
    activateTaskModal: id => dispatch(activateTaskModal(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
