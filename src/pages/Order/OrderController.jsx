// OrderController.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../contexts/useOrder";
import { useAuth } from "../../contexts/useAuth";
import {
  calculateSubtotal,
  calculateShipping,
  calculateTotal,
  createOrderData,
  saveOrder,
} from "./OrderModel";

export const useOrderController = () => {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [animatedSubtotal, setAnimatedSubtotal] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  const { user } = useAuth();
  const {
    orders,
    removeOrder,
    increaseOrderQuantity,
    decreaseOrderQuantity,
    clearOrders,
  } = useOrder();
  const navigate = useNavigate();

  const subtotal = calculateSubtotal(orders);
  const shippingCost = calculateShipping(orders);
  const total = calculateTotal(subtotal, shippingCost);

  useEffect(() => {
    const animationDuration = 300;
    const frameRate = 10;
    const frames = animationDuration / frameRate;
    const stepSubtotal = (subtotal - animatedSubtotal) / frames;
    const stepTotal = (total - animatedTotal) / frames;

    const interval = setInterval(() => {
      setAnimatedSubtotal((prev) => {
        const next = prev + stepSubtotal;
        if (
          (stepSubtotal > 0 && next >= subtotal) ||
          (stepSubtotal < 0 && next <= subtotal)
        ) {
          return subtotal;
        }
        return next;
      });

      setAnimatedTotal((prev) => {
        const next = prev + stepTotal;
        if (
          (stepTotal > 0 && next >= total) ||
          (stepTotal < 0 && next <= total)
        ) {
          return total;
        }
        return next;
      });
    }, frameRate);

    return () => clearInterval(interval);
  }, [subtotal, total]);

  const goBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tabId) => setActiveTab(tabId);

  const handleCardNumberChange = (e) => {
    let value =
      e.target.value
        .replace(/\D/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || "";
    setCardNumber(value.slice(0, 19));
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpirationDate(value.slice(0, 5));
  };

  const validateForm = () => {
    let errors = {};

    if (!cardName) errors.cardName = "Card name is required.";
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, "")))
      errors.cardNumber = "Card number must be 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate))
      errors.expirationDate = "MM/YY format required.";
    if (!/^\d{3}$/.test(cvv)) errors.cvv = "CVV must be 3 digits.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    const orderData = createOrderData(orders, total);

    try {
      const response = await saveOrder(orderData);
      if (response.ok) {
        alert("The order has been placed");
        clearOrders();
        navigate("/");
      } else {
        alert("Failed to save order");
      }
    } catch (error) {
      console.error("Error while saving order:", error);
    }
  };

  return {
    user,
    orders,
    activeTab,
    cardName,
    cardNumber,
    expirationDate,
    cvv,
    formErrors,
    animatedSubtotal,
    animatedTotal,
    subtotal,
    shippingCost,
    total,
    goBack,
    removeOrder,
    increaseOrderQuantity,
    decreaseOrderQuantity,
    handleTabClick,
    setCardName,
    handleCardNumberChange,
    handleExpirationDateChange,
    setCvv,
    handleCheckout,
  };
};
