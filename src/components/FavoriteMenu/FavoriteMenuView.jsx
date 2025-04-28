import React from "react";

const FavoriteMenuView = ({ foodItems, handleOrderNow, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favorite__body">
      <h3 className="visually-hidden">Favorite Menu</h3>
      <ul className="favorite__list">
        {foodItems
          .filter((food) => food.menu.includes("bestDelivered"))
          .slice(0, 3)
          .map((item) => (
            <li className="favorite__item" key={item.id}>
              <div className="card">
                <div className="card__preview">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card__preview-image"
                    width="300"
                    height="300"
                    loading="lazy"
                  />
                </div>
                <div className="card__body">
                  <h4 className="card__body-title">{item.name}</h4>
                  <button
                    className="card__body-button"
                    onClick={() => handleOrderNow(item)}
                  >
                    Order Now &gt;
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FavoriteMenuView;
