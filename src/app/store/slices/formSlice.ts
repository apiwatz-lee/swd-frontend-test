'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: string[];
  gender: string;
  mobilePhone: string;
  passportNo: string;
  salary: number;
}
[];

const initialState: FormState = {
  title: '',
  firstname: '',
  lastname: '',
  birthday: '',
  nationality: '',
  citizenId: ['', '', '', '', ''],
  gender: 'male',
  mobilePhone: '',
  passportNo: '',
  salary: 0,
};

const saveToLocalStorage = (state: FormState): void => {
  const existingData = JSON.parse(
    localStorage.getItem('applicantForm') || '[]',
  ) as FormState[];
  const updatedData = [...existingData, state];
  localStorage.setItem('applicantForm', JSON.stringify(updatedData));
};

const formSlice = createSlice({
  name: 'applicantForm',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Partial<FormState>>) => {
      saveToLocalStorage(action.payload as FormState);
    },
  },
});

export const { addForm } = formSlice.actions;

export default formSlice.reducer;
