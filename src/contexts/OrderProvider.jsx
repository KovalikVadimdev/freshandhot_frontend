import { useState } from "react";
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((o) => o.id === order.id);

      if (existingOrder) {
        return prevOrders.map((o) =>
          o.id === order.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      } else {
        return [...prevOrders, { ...order, quantity: 1 }];
      }
    });
  };

  const increaseOrderQuantity = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, quantity: order.quantity + 1 } : order
      )
    );
  };

  const decreaseOrderQuantity = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, quantity: Math.max(order.quantity - 1, 1) }
          : order
      )
    );
  };

  const removeOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
        increaseOrderQuantity,
        decreaseOrderQuantity,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
