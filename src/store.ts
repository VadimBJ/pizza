import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from './features/pizzas/pizzasSlice';

const store = configureStore({
  reducer: {
    pizza: pizzaReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;