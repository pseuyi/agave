import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Column from './column'

class Board extends Component {
  static propTypes = {
    tasks: PropTypes.object // key tasks by status
  }

  render () {
    return (
      <section>
        <Column header='open'/>
        <Column header='ready'/>
        <Column header='in progress'/>
        <Column header='done'/>
      </section>
    )
  }
}

export default connect(null, null)(Board);
