import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadSearchValue } from '../utils/localStorageUtils';

export type SearchValueState = {
  value: string;
};

const initialState: SearchValueState = {
  value: loadSearchValue(),
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export default searchValueSlice.reducer;

export const { changeSearch } = searchValueSlice.actions;
// export const selectSearchValue = (state) => state.searchValue.value;
