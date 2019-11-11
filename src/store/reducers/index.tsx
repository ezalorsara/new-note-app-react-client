import authSlice from './auth';
import noteSlice from './note';
import { combineReducers } from 'redux';

const rootReducer = combineReducers(
  {
    auth: authSlice.reducer,
    note: noteSlice.reducer
  }
);

export default rootReducer;