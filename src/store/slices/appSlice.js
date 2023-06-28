import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    username: null,
    firstName: 'Clyde',
    errorMessage: '',
    monthlyIncome: '$150,000',
    expenses: {}

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
    },
    setExpenses: (state, action) => {
      for (let key in action) {
        state.expenses[key] = action[key];
      }
    }
  },


});

export const {
  setUserName,
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
  setExpenses,

} = appSlice.actions;
export default  appSlice.reducer;