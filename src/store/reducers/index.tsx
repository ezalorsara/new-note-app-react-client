import authSlice from './auth';
import { counterReducer } from './counter';
import { combineReducers } from 'redux'; 

const rootReducer = combineReducers(
  { 
    counter: counterReducer, 
    auth: authSlice.reducer
  }
);

export default rootReducer;