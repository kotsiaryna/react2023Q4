import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadSearchValue } from '../utils/localStorageUtils';

const initialState = loadSearchValue() || '';

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state = action.payload;
    },
  },
});

export default searchValueSlice.reducer;

export const { changeSearch } = searchValueSlice.actions;
