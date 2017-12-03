import React, { Component } from 'react';

const Card = ({ task, handleEditTaskModal, ...articleProps }) => (
  <article {...articleProps}> // articleProps contains handlers from react-grid-layout that should be attached to this dom element
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
