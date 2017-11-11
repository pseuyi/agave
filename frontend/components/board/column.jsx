import React, { Component } from 'react';

class Column extends Component {
  render () {
    return (
      <section className='column'>
        <header><h1>{this.props.header}</h1></header>
      </section>
    )
  }
}

export default Column;
