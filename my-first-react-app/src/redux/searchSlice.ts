import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SEARCH_VALUE } from '../const';

const initialState = DEFAULT_SEARCH_VALUE;

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export default searchValueSlice.reducer;

export const { changeSearch } = searchValueSlice.actions;
