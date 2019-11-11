
import { takeLatest, put } from 'redux-saga/effects';
import { fetchNoteList } from '../services/note';
import { Auth } from 'aws-amplify';
import { logoutSuccess } from '../store/reducers/auth';
import { fetchNoteListSuccess } from '../store/reducers/note';


function yieldLogin(action: any) {


}

function* yieldLogout() {
  yield Auth.signOut().then(data => { console.log(data); });
  yield put(logoutSuccess());
  // yield put({type : 'INCREMENT_ASYNC'});
}

function* yieldNoteFetchList() {
  let notes;
  yield fetchNoteList().then((result: any) => {
    notes = result;
  });
  yield put(fetchNoteListSuccess(notes));
}

export function* watchAllSagas() {

  // yield takeLatest('LOGIN', yieldLogin);
  yield takeLatest('FETCH_NOTE_LIST', yieldNoteFetchList);
  yield takeLatest('LOGOUT', yieldLogout);


}





