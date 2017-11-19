import React, { Component } from 'react';

const Card = (props) => (
  <article {...props} >
  <header>{props.task.title}</header>
  <p>{props.task.description}</p>
  {props.task.children}
  <button
    className="edit-task-button"
    type="edit"
    onClick={() => props.handleEditTaskModal(props.task.id)}
    >
    edit
  </button>
  </article>
)

export default Card;
