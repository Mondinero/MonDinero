import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    username: null,
    firstName: null,
    errorMessage: '',
    monthlyIncome: null,
    expenses: {
      entertainment: 0,
      food_and_drink: 0,
      general_merchandise :0,
      transportation: 0,
      travel: 0,
      rent_and_utilities:0
    },
    prevBudget: {},
    colorTheme: null,
    totalBudget: 0
  },

  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMessage = action.payload;
    },
    setMonthlyIncome: (state, action) => {
      state.monthlyIncome = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = { ...state.expenses, ...action.payload };
    },
    setColorTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
    setTotalBudget: (state, action) => {
      state.totalBudget = Number(action.payload)
    },
    setPrevBudget: (state, action) => {
      state.prevBudget = {...state.prevBudget, ...action.payload}
    }
  },
});

export const {
  setUserName,
  setFirstName,
  setErrorMsg,
  setMonthlyIncome,
  setExpenses,
  setColorTheme,
  setTotalBudget,
  setPrevBudget
} = appSlice.actions;
export default  appSlice.reducer;
