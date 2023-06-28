import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    transactionsGraphData: 'default',
    accountData: []
  },
  reducers: {
    setTransactionsGraphData: (state, action) => {
      state.transactionsGraphData = action.payload;
    },

    setAccountData: (state, action) => {
      state.accountData = action.payload;
    }
  }
});

export const { setTransactionsGraphData, setAccountData } = dataSlice.actions;

export default dataSlice.reducer;
