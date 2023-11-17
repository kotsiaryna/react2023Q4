import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '10';

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    changeItemsPerPage(state, action: PayloadAction<string>) {
      state = action.payload;
    },
  },
});

export default itemsPerPageSlice.reducer;
export const { changeItemsPerPage } = itemsPerPageSlice.actions;
