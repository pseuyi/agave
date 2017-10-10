import axios from 'axios';

import { receiveError } from './error_actions';

export const RECEIVE_TASKS = 'TASKS::RECEIVE_TASKS';

export const fetchTasks = (userId) => {
  return (dispatch) => {
    axios.get(`users/${userId}/tasks`)
      .then( res => dispatch(receiveTasks(res.data.data)))
      .catch( err => dispatch(receiveError(err.response.data[0])))
  }
}

const receiveTasks = (data) => {
  const tasks = data.map((d) => {
    return { ...d.attributes, id: d.id };
  })

  return {
    type: RECEIVE_TASKS,
    tasks
  }
}
