import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import credentialSlice from './slices/credentialSlice';

export const store = configureStore({
  reducer: {
    appSlice: appSlice,
    credentialSlice: credentialSlice
  }
});
