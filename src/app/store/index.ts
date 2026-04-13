import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';

const rootReducer = combineReducers({
  applicantForm: formReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
