export const calculateSubtotal = (orders) => {
  return orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );
};

export const calculateShipping = (orders) => {
  return orders.length > 0 ? 80 : 0;
};

export const calculateTotal = (subtotal, shippingCost) => {
  return subtotal + shippingCost;
};

export const createOrderData = (orders, total) => ({
  id: Math.floor(Math.random() * 100),
  items: orders.map((order) => ({
    name: order.name,
    quantity: order.quantity,
  })),
  price: total,
});

export const saveOrder = async (orderData) => {
  const response = await fetch(
    "https://express-vercell-testing.vercel.app/api/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    }
  );
  return response;
};
