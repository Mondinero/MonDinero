import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    username: null,
    firstName: 'Clyde',
    errorMessage: '',
    monthlyIncome: null
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
    },
    setMonthlyIncome: (state, action) => {
      state.monthlyIncome = action.payload
    }
  },


});

export const {
  setUserName,
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,

} = appSlice.actions;
export default  appSlice.reducer;