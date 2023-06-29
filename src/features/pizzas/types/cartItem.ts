import Pizza from "./pizza";

export default interface CartItem {
  id: number;
  pizza: Pizza;
  isDoubleCheese: boolean;
  isExtraCheeseboard: boolean;
  crustSize: string;
  seasoning: string;
  pizzaSize: string;
  quantity: number;
  totalPrice: number;
}
