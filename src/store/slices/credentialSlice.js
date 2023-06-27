import { createSlice } from '@reduxjs/toolkit';

export const credentialSlice = createSlice({
  name: 'credentialSlice',
  initialState: {
    linkToken: 'default'
  },
  reducers: {
    setLinkToken: (state, action) => {
      state.linkToken = action.payload;
    }
  }
});

export const { setLinkToken } = credentialSlice.actions;

export default credentialSlice.reducer;
