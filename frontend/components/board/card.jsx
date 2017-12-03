import React from 'react';

// articleProps contains handlers from react-grid-layout that should be attached to this dom element
const Card = ({ task, handleEditTaskModal, ...articleProps }) => (
  <article {...articleProps}>
    <header>{task.get('title')}</header>
    <p>{task.get('description')}</p>
    {task.get('children')}
    <button
      className="edit-task-button non-draggable-element"
      type="edit"
      onClick={() => handleEditTaskModal(task.get('id'))}
      >
      edit
    </button>
  </article>
);

export default Card;
