import axios from 'axios';
import { normalize } from 'normalizr';

import { receiveError } from 'actions/error_actions';
import * as APIUtil from '../util/session_util';
import * as actions from '../consts/action-types';
import * as schema from '../lib/schema';

const normalizedData = (data, schema, label) => normalize({ [label]: data }, schema);

const massageData = (data, schema, label) => {
  if (Array.isArray(data)) {
    data = res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
  } else {
    data = [{ id: res.data.data.id, ...res.data.data.attributes }]
  }

  if (schema) return normalizedData(data, schema, label);

  return data;
}

const api = ({ getState, dispatch }) => next => action => {

  if (action.type !== actions.API) {
    return next(action);
  }

  const { options, schema, success, label } = action.payload;

  axios({ ...options })
    .then( res => massageData(res, schema, label) )
    .then( data => dispatch(success(data)) )
    .catch( err => dispatch(receiveError(err)))
}

export default api;


/*
  {
    type: actions.API,
    payload: {
      url: 'api/books.json',
      schema: [schema.books],
      success: ({ entities }) => [
        setAuthors(entities.authors),
        setBooks(entities.books)
      ],
      label: 'books'
    }
  }
*/
