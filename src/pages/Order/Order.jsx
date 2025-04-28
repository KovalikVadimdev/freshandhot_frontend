import { useOrderController } from "./OrderController";

import OrderView from "./OrderView";

const Order = () => {
  const controller = useOrderController();
  return <OrderView {...controller} />;
};

export default Order;
