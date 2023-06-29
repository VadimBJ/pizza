import { RootState } from '../../store';
import Pizza from './types/pizza';

export const selectPizza = (state:RootState): Pizza[] => state.pizza.pizzas;
export const selectIsLoading = (state:RootState): boolean => state.pizza.isLoading;
export const selectIsChange = (state:RootState): boolean => state.pizza.isChange;
