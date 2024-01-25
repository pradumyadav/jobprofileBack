import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/Home/homeSlice';
import lectureSlice from '../features/lecture/lectureSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer, 
    lecture: lectureSlice
  },
});
