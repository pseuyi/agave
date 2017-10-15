import React, { Component } from 'react';

const Card = ({title, description}) => (
  <article className='card-container'>
    <header>{title}</header>
    <p>{description}</p>
  </article>
)

export default Card;
