import React, { Component } from 'react';
import Draggable from 'react-draggable';

const Card = ({title, description}) => (
  <Draggable grid={[50, 50]}>
    <article className='card-container'>
      <header>{title}</header>
      <p>{description}</p>
    </article>
  </Draggable>
)

export default Card;
