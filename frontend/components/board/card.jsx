import React, { Component } from 'react';

const Card = (props) => (
  <article className={props.className} style={props.style}>
    <header>{props.task.title}</header>
    <p>{props.task.description}</p>
    {props.task.children}
    <button
      className="edit-task-button non-draggable-element"
      type="edit"
      onClick={() => props.handleEditTaskModal(props.task.id)}
      >
      edit
    </button>
  </article>
)

export default Card;
