'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: string;
  gender: string;
  mobilePhone: string;
  passportNo: string;
  salary: number;
}

const initialState: FormState = {
  title: '',
  firstname: '',
  lastname: '',
  birthday: '',
  nationality: '',
  citizenId: '',
  gender: 'male',
  mobilePhone: '',
  passportNo: '',
  salary: 0,
};

const formSlice = createSlice({
  name: 'applicantForm',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { addForm, resetForm } = formSlice.actions;

export default formSlice.reducer;
