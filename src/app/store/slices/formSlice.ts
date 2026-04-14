'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataFromLocalStorage } from '../../hooks/localStorage';

interface FormState {
  key: string;
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

export const applicantInitialValues: FormState = {
  key: '',
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

const initialState = getDataFromLocalStorage(
  'applicantForm',
  [] as FormState[],
);

const formSlice = createSlice({
  name: 'applicantForm',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<Partial<FormState>>) => {
      state.push(action.payload as FormState);
    },
  },
});

export const { addForm } = formSlice.actions;

export default formSlice.reducer;
