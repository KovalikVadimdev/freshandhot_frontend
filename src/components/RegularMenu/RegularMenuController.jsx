import React, { useEffect, useState } from "react";
import { useOrder } from "../../contexts/useOrder";
import { useNavigate } from "react-router-dom";
import { fetchMenuItems } from "./RegularMenuModel";
import RegularMenuView from "./RegularMenuView";

const RegularMenuController = () => {
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await fetchMenuItems();
        setFoodItems(data);
      } catch (error) {
        console.error("Error receiving data:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
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
    <RegularMenuView foodItems={foodItems} handleAddToCart={handleAddToCart} />
  );
};

export default RegularMenuController;
