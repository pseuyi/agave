import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskForm from 'components/task_form';
import { createTask } from 'actions/task_actions';
import { newPrioritySelector } from 'reducers/selectors';

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 0 4.4rem;
`

export class Footer extends Component {
  static propTypes = {
    tasks: PropTypes.array,
  }

  handleAddTask = (values) => {
    values = values.set('priority', this.props.newPriority);
    this.props.createTask(values.toJS());
  }

  // add initialValues so newPrioritySelector has an initial status;
  render () {
    console.log('priority: ', this.props.newPriority);
    return (
      <Container>
        <TaskForm
          onSubmit={this.handleAddTask}
          initialValues={{ status: 'open' }}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  newPriority: newPrioritySelector(state),
})

const mapDispatchToProps = dispatch => ({
  createTask: (values) => dispatch(createTask(values)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
