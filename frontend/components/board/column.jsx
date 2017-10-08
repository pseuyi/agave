import React, { Component } from 'react';

class Column extends Component {
  render () {
    return (
      <section>
        <header>{ this.props.header }</header>
      </section>
    )
  }
}

export default Column;
