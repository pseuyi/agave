import React, { Component } from 'react';
import Card from 'components/board/card'

class Column extends Component {

  renderCards = tasks => (
    tasks.map((task, idx) => (
      <Card
        title={task.title}
        key={`${task.id}-${task.title}`}
        description={task.description}
      />
    ))
  )

  render () {
    return (
      <section id="board-column">
        <header><h1>{this.props.header}</h1></header>
        { this.props.tasks && this.renderCards(this.props.tasks) }
      </section>
    )
  }
}

export default Column;
