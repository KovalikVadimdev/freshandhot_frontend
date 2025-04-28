import React from "react";
import starYellow from "../../assets/icons/star_yellow.svg";

const RegularMenuView = ({ foodItems, handleAddToCart }) => {
  return (
    <div className="regular__header-inner container">
      <header className="regular__header">
        <div className="regular__content">
          <h2 className="regular__title" id="favorite-title">
            Our <span className="regular__title--highlight">Regular</span> Menu
          </h2>
          <a href="/menu" className="regular__link button button-medium">
            See All
          </a>
        </div>
        <p className="regular__text">
          There Are Our Regular Menus. You Can Order Anything You Like.
        </p>
      </header>

      <div className="regular__body">
        <h3 className="visually-hidden">Partial Menu</h3>
        <ul className="regular__list">
          {foodItems
            .filter((food) => food.menu.includes("unComplete"))
            .slice(0, 6)
            .map((item) => (
              <li className="regular__item" key={item.id}>
                <div className="regular__card">
                  <div className="regular__card-preview">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="regular__card-image"
                      width="262"
                      height="262"
                    />
                  </div>
                  <div className="regular__card-body">
                    <div className="regular__card-description">
                      <h4 className="regular__card-title">
                        {item.nameHighlight && (
                          <span className="regular__card-title--highlight">
                            {item.nameHighlight}
                          </span>
                        )}
                        {item.name}
                      </h4>
                      <div className="regular__card-rating">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <img
                            key={index}
                            src={starYellow}
                            alt="Star"
                            className="regular__card-star"
                          />
                        ))}
                        <p className="regular__card-rating-text">
                          ({item.reviews || 0})
                        </p>
                      </div>
                    </div>
                    <div className="regular__card-action">
                      <p className="regular__card-price">₴{item.price}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="regular__card-button button button-small"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RegularMenuView;
