import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activateTaskModal } from 'actions/modal_actions';

const Card = (props) => {

  const handleEditTask = () => {
    props.activateTaskModal(props.task.id)
  }

  return (
    <article {...props} >
    <header>{props.task.title}</header>
    <p>{props.task.description}</p>
    {props.task.children}
    <button
      className="edit-task-button"
      type="edit"
      onClick={handleEditTask}
      >
      edit
    </button>
    </article>
  )
}

const mapDispatchToProps = (dispatch) => ({
  activateTaskModal: id => dispatch(activateTaskModal(id)),
})

export default connect(
  null,
  mapDispatchToProps
)(Card);
