import React, { useEffect, useState } from "react";
import { useOrder } from "../../contexts/useOrder";
import { fetchMenuItems } from "./PopularFoodModel";
import PopularFoodView from "./PopularFoodView";

const PopularFoodController = () => {
  const { addOrder } = useOrder();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMenuItems();
        setFoodItems(data);
      } catch (error) {
        console.error("Error receiving data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <PopularFoodView
      foodItems={foodItems}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleAddToCart={handleAddToCart}
    />
  );
};

export default PopularFoodController;
