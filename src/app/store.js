import { configureStore } from '@reduxjs/toolkit';
import globalSlice from "../features/global";
import jokesSlice from '../features/jokes/jokes-slice';
export const store = configureStore({
  reducer: {
    global: globalSlice,
    jokesSlice : jokesSlice
  },
});
