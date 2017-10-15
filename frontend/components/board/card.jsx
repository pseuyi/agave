import React, { Component } from 'react';
import Draggable from 'react-draggable';

const Card = ({title, description, width}) => (
  <Draggable grid={[width * 0.05, 120]}>
    <article className='card-container'>
      <header>{title}</header>
      <p>{description}</p>
    </article>
  </Draggable>
)

export default Card;
