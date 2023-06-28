import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    colorTheme: null,
  },
  reducers: {
    setColorTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
  },
});

export const { setColorTheme } = appSlice.actions;

export default appSlice.reducer;
