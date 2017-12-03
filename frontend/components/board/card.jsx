import React, { Component } from 'react';

const Card = ({ task, handleEditTaskModal, ...articleProps }) => (
  <article {...articleProps}>
    <header>{task.title}</header>
    <p>{task.description}</p>
    {task.children}
    <button
      className="edit-task-button non-draggable-element"
      type="edit"
      onClick={() => handleEditTaskModal(task.id)}
      >
      edit
    </button>
  </article>
)

export default Card;
