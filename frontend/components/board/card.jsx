import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => (
  <article {...props} >
    <header>{props.task.title}</header>
    <p>{props.task.description}</p>
    {props.task.children}
    <Link to={`/edit/${props.task.id}`}>edit</Link>
  </article>
)

export default Card;
