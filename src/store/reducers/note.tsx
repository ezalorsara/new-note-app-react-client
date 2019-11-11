import { createSlice } from 'redux-starter-kit';
import { NOTE_STATE_TYPE } from '../../types';

const NoteState:NOTE_STATE_TYPE = {
  list_data: [],
  single_data: {}
}

const noteSlice = createSlice({
  name: 'note',
  initialState : NoteState,
  reducers : {
    fetchNoteListSuccess(state, action) {
      state.list_data = action.payload;
      return state;
    }
  }
})

export const { fetchNoteListSuccess } = noteSlice.actions;

export default noteSlice;