import React, { useState, useEffect } from "react";
import { useOrder } from "../../contexts/useOrder";
import { useNavigate } from "react-router-dom";
import { fetchMenuItems } from "./FavoriteMenuModel";
import FavoriteMenuView from "./FavoriteMenuView";

const FavoriteMenuController = () => {
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await fetchMenuItems();
        setFoodItems(data);
      } catch (error) {
        console.error("Error receiving data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();

    // Short Polling
    // const intervalId = setInterval(() => {
    //   fetchMenu();
    // }, 5000);

    // return () => clearInterval(intervalId);
  }, []);

  const handleOrderNow = (item) => {
    addOrder({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
    });
    navigate("/order");
  };

  return (
    <FavoriteMenuView
      foodItems={foodItems}
      loading={loading}
      handleOrderNow={handleOrderNow}
    />
  );
};

export default FavoriteMenuController;
