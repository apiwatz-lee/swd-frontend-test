'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataFromLocalStorage } from '../../hooks/localStorage';

export interface FormState {
  key: React.Key;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: string[];
  gender: string;
  mobilePhone: string[];
  passportNo: string;
  salary: number | null;
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
  mobilePhone: ['', ''],
  passportNo: '',
  salary: null,
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

    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      const { key, ...rest } = action.payload;
      const index = state.findIndex((form: FormState) => form.key === key);
      const isFound = index !== -1;
      if (isFound) {
        state[index] = { ...state[index], ...rest } as FormState;
      }
    },
    removeForm: (state, action: PayloadAction<React.Key>) => {
      const key = action.payload;
      return state.filter((form: FormState) => form.key !== key);
    },
    removeMultipleForms: (state, action: PayloadAction<React.Key[]>) => {
      const keysToRemove = action.payload;
      return state.filter(
        (form: FormState) => !keysToRemove.includes(form.key),
      );
    },
  },
});

export const { addForm, updateForm, removeForm, removeMultipleForms } =
  formSlice.actions;

export default formSlice.reducer;
