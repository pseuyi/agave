// import axios from 'axios';
// import { get } from 'lodash';
//
// import * as APIUtil from '../util/session_util';
// import * as actions from '../consts/action-types';
// import { massageData } from '../util/api_util';
//
// const handleMeta = (data, action) => {
//   if (get(action, 'meta.persistToLocalStorage', false)) {
//     APIUtil.setUserLocalStorage(data);
//   }
//
//   if (get(action, 'meta.clearLocalStorage', false)) {
//     APIUtil.removeUserLocalStorage();
//   }
//
//   return data;
// };
//
// const handleSuccess = (data, success, dispatch) => {
//   if (Array.isArray(success(data))) {
//     success(data).forEach(action => dispatch(action));
//   } else {
//     dispatch(success(data));
//   }
// };
//
// const api = ({ getState, dispatch }) => next => action => {
//   if (action.type !== actions.API) {
//     return next(action);
//   };
//
//   const { options, schema, success, label } = action.payload;
//
//   axios({ ...options })
//     .then( res => massageData(res, schema, label) )
//     .then( data => handleMeta(data, action) )
//     .then( data => handleSuccess(data, success, dispatch) )
//     .catch( err => dispatch(receiveError(err)) )
// };
//
// export default api;
