import React, { Component } from 'react';
import Card from 'components/board/card'

class Column extends Component {

  renderCards = cards => (
    cards.map((card, idx) => (
      <Card title={card} key={`${idx}-${card}`}/>
    ))
  )

  render () {
    return (
      <section id="board-column">
        <header>{ this.props.header }</header>
        { this.renderCards(['apple', 'orange', 'mango']) }
      </section>
    )
  }
}

export default Column;
