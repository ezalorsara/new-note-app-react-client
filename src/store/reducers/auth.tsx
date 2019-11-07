import { createSlice } from 'redux-starter-kit';

const authInitialState = {
  isloggedin: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState : authInitialState,
  reducers : {
    loginSuccess(state, action) {
      state = action.payload;
      console.log("State: ", state);
      return state;
    },
    logoutSuccess(state, action) {

    }
  }
})

export const { loginSuccess, logoutSuccess} = authSlice.actions;

export default authSlice;