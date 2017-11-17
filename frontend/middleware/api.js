import axios from 'axios';
import { normalize } from 'normalizr';

import * as actions from '../consts/action-types';
import * as schema from '../lib/schema';

const api = ({getState, dispatch}) => next => action => {

  if (actions.type === actions.API) {
    return next(action);
  }

  

}
