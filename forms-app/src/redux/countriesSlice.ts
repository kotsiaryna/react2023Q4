import { createSlice } from '@reduxjs/toolkit';
import countries from './countries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: countries,
  reducers: {},
});

export default countriesSlice.reducer;
