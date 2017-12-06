import { all } from 'redux-saga/effects';
import { loginFlow, waitingSignUp } from './session_saga';

export default function* rootSaga() {
  yield all([
    loginFlow(),
    waitingSignUp(),
  ]);
}
