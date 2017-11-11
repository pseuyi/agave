import React, { Component } from 'react';

const Card = (props) => (
  <article {...props} >
    <header>{props.title}</header>
    <p>{props.description}</p>
      {props.children}
  </article>
)

export default Card;
