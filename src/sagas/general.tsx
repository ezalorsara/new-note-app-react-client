
import { takeLatest, delay, put } from 'redux-saga/effects';


export function* watchCounter() {
   yield takeLatest('INCREMENT', yieldCounter);
}

function* yieldCounter() {
  yield delay(2000);
  yield put({type : 'INCREMENT_ASYNC'});
}

