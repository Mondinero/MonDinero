import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    username: null,
    firstName: null,
    errorMessage: ''
  },

  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload
    },
    setErrorMsg: (state, action) => {
      state.errorMessage = action.payload
    }
  },


});

export const {
  setUserName,
  setFirstName,
  setErrorMsg

} = appSlice.actions;
export default  appSlice.reducer;