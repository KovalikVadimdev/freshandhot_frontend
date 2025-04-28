// HeaderModel.js
import { useOrder } from "../../contexts/useOrder";
import { useAuth } from "../../contexts/useAuth";

export const useHeaderModel = () => {
  const { orders } = useOrder();
  const { user, logout } = useAuth();

  const cartCount = orders.reduce((total, item) => total + item.quantity, 0);

  return { user, logout, cartCount };
};
