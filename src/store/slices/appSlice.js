import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    username: null,
    firstName: null,
    errorMessage: '',
    monthlyIncome: '$150,000',
    expenses: {},
    colorTheme: null,
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
      state.expenses = { ...state.expenses, ...action.payload}
    },
      setColorTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
  },


});

export const {
  setUserName,
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
  setExpenses,
  setColorTheme,
} = appSlice.actions;
export default  appSlice.reducer;

