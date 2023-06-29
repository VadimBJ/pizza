import Pizza from "./pizza";

export default interface PizzasState {
  pizzas: Pizza[];
  error?: string;
  isLoading: boolean;
  isChange: boolean;
}
