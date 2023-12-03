import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';
import countriesSlice from './countriesSlice';

const store = configureStore({
  reducer: {
    form: formSlice,
    countries: countriesSlice,
  },
});

export default store;
