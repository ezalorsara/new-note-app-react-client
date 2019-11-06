
const loggedinReducer = (state=false, action:any) => {
  switch(action.type) {
    case 'LOGGED_IN':
      state = true;
    break;
    case 'LOGGED_OUT':
      state = false;
    break;
  }
  return state;
}

export { loggedinReducer }