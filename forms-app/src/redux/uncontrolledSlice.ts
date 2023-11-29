import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UncontrolledFormState } from '../types';

const initialState: UncontrolledFormState = {
  name: '',
  age: '',
  email: '',
  password: '',
  gender: 'male',
  tc: false,
};

const uncontrolledSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    saveData: (
      state: UncontrolledFormState,
      action: PayloadAction<UncontrolledFormState>
    ) => action.payload,
  },
});

export const { saveData } = uncontrolledSlice.actions;
export default uncontrolledSlice.reducer;
