import { useState, useEffect } from "react";
import { useOrder } from "../../contexts/useOrder";
import { fetchMenuData } from "./SnackFoodModel";
import SnackFoodView from "./SnackFoodView";

const SnackFoodController = () => {
  const { addOrder } = useOrder();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await fetchMenuData();
      setFoodItems(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  const handleIncrease = (id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item
      )
    );
  };

  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      for (let i = 0; i < item.quantity; i++) {
        addOrder({
          id: item.id,
          name: item.orderName,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        });
      }

      setFoodItems((prevItems) =>
        prevItems.map((food) =>
          food.id === item.id ? { ...food, quantity: 0 } : food
        )
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SnackFoodView
      foodItems={foodItems}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleAddToCart={handleAddToCart}
    />
  );
};

export default SnackFoodController;
