import React from 'react';
import TaskForm from 'components/task_form';
import style from './index.scss';

const Footer = (props) => {
  return (
    <footer className="footer">
      <TaskForm handleSubmit={() => {}}/>
    </footer>
  )
}

export default Footer;
