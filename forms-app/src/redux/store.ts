import { configureStore } from '@reduxjs/toolkit';
import uncontrolledSlice from './uncontrolledSlice';

const store = configureStore({
  reducer: {
    uncontrolled: uncontrolledSlice,
  },
});

export default store;
