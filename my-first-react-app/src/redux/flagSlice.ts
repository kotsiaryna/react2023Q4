import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FlagsState = {
  isLoadingResults: boolean;
  isLoadingPage: boolean;
  isLoadingDetails: boolean;
};

const initialState: FlagsState = {
  isLoadingResults: false,
  isLoadingPage: false,
  isLoadingDetails: false,
};

const flagSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    changeResultsFlag(state, action: PayloadAction<boolean>) {
      state.isLoadingResults = action.payload;
    },
    changePageFlag(state, action: PayloadAction<boolean>) {
      state.isLoadingPage = action.payload;
    },
    changeDetailsFlag(state, action: PayloadAction<boolean>) {
      console.log(action.payload);
      state.isLoadingDetails = action.payload;
    },
  },
});

export default flagSlice.reducer;

export const { changeDetailsFlag, changePageFlag, changeResultsFlag } = flagSlice.actions;
