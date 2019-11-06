import { loggedinReducer } from './auth';
import { counterReducer } from './counter';
import { combineReducers } from 'redux'; 

const rootReducer = combineReducers(
  { 
    counter: counterReducer, 
    loggedin: loggedinReducer
  }
);

export default rootReducer ;