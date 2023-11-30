import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UncontrolledFormState } from '../types';

const initialState: UncontrolledFormState = {
  name: '',
  age: 1,
  email: '',
  password: '',
  gender: 'male',
  tc: false,
  file: '',
};

const uncontrolledSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    saveData: (
      state: UncontrolledFormState,
      action: PayloadAction<UncontrolledFormState>
    ) => {
      const file = state.file;
      state = action.payload;
      state.file = file;

      return state;
    },
    saveImg64: (
      state: UncontrolledFormState,
      action: PayloadAction<string>
    ) => {
      state.file = action.payload;
      return state;
    },
  },
});

export const { saveData, saveImg64 } = uncontrolledSlice.actions;
export default uncontrolledSlice.reducer;
