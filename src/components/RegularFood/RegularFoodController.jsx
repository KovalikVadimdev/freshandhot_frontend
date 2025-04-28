import React, { useState, useEffect } from "react";
import { useOrder } from "../../contexts/useOrder";
import { fetchMenuItems } from "./RegularFoodModel";
import RegularFoodView from "./RegularFoodView";

const RegularFoodController = () => {
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

    // Short Polling
    // const intervalId = setInterval(fetchData, 5000);
    // return () => clearInterval(intervalId);
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
    <RegularFoodView
      foodItems={foodItems}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleAddToCart={handleAddToCart}
    />
  );
};

export default RegularFoodController;
