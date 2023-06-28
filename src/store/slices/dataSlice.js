import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    transactionsGraphData: 'default'
  },
  reducers: {
    setTransactionsGraphData: (state, action) => {
      state.transactionsGraphData = action.payload;
    }
  }
});

export const { setTransactionsGraphData } = dataSlice.actions;

export default dataSlice.reducer;
