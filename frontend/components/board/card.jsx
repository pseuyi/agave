import React, { Component } from 'react';
import Draggable from 'react-draggable';

const Card = ({title, description, width, bounds}) => (
  <Draggable grid={[width * 0.05, 120]} bounds={bounds}>
    <article className='card-container'>
      <header>{title}</header>
      <p>{description}</p>
    </article>
  </Draggable>
)

export default Card;
