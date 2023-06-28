import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import credentialSlice from './slices/credentialSlice';
import dataSlice from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    appSlice: appSlice,
    credentialSlice: credentialSlice,
    dataSlice: dataSlice
  }
});
