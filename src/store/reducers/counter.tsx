import { createReducer } from 'redux-starter-kit';



const counterReducer = (state=0, action:any) => {
  switch(action.type){
    case 'INCREMENT_ASYNC':
      state = state + 1;
    break;
    case 'DECREMENT':
      state = state - 1;
    break;
  }
  return state;
}

export { counterReducer }

