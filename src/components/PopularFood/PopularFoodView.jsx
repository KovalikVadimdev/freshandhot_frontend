import React from "react";
import Rating from "../Rating";

const PopularFoodView = ({
  foodItems,
  handleIncrease,
  handleDecrease,
  handleAddToCart,
}) => {
  return (
    <div className="menu__header-inner container">
      <header className="menu__header">
        <h2 className="menu__description">
          Our <span className="menu__description--highlight">Best Popular</span>{" "}
          Indian Dish
        </h2>
      </header>

      <div className="menu__body">
        <h3 className="visually-hidden">Best Menu</h3>
        <ul className="menu__list">
          {foodItems
            .filter((food) => food.menu.includes("bestPopular"))
            .map((item) => (
              <li className="menu__item" key={item.id}>
                <div className="menu__card">
                  <img
                    src={item.image}
                    alt={typeof item.name === "string" ? item.name : "Food"}
                    className="menu__image"
                    width="250"
                    height="250"
                  />

                  <h4 className="menu__title">{item.name}</h4>

                  <div className="menu__rating">
                    <Rating />
                    <p className="menu__text">({item.reviews})</p>
                  </div>

                  <p className="menu__price">₴{item.price}</p>

                  <div className="menu__action">
                    <button
                      className="menu__action-remove button"
                      onClick={() => handleDecrease(item.id)}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <p className="menu__action-count">
                      {String(item.quantity).padStart(2, "0")}
                    </p>
                    <button
                      className="menu__action-add button"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="menu__add button"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.quantity === 0}
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularFoodView;
