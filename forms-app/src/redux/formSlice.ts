import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormsState } from '../types';

const initialState: FormsState[] = [
  {
    name: '',
    age: 1,
    email: '',
    password: '',
    gender: 'male',
    tc: false,
    file: '',
  },
];

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveData: (state: FormsState[], action: PayloadAction<FormsState>) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { saveData } = formSlice.actions;
export default formSlice.reducer;
