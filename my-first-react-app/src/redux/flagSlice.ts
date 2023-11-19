import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FlagsState = {
  isLoadingResults: boolean;
  isLoadingDetails: boolean;
};

const initialState: FlagsState = {
  isLoadingResults: false,
  isLoadingDetails: false,
};

const flagSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    changeResultsFlag(state, action: PayloadAction<boolean>) {
      state.isLoadingResults = action.payload;
    },
    changeDetailsFlag(state, action: PayloadAction<boolean>) {
      state.isLoadingDetails = action.payload;
    },
  },
});

export default flagSlice.reducer;

export const { changeDetailsFlag, changeResultsFlag } = flagSlice.actions;
