// HeaderView.jsx
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import person from "../../assets/icons/person.svg";

export const HeaderView = ({
  overlayRef,
  burgerRef,
  handleLogout,
  user,
  cartCount,
}) => {
  const location = useLocation();

  return (
    <div className="header__body">
      <div className="header__body-inner container">
        <Link
          className="header__logo logo"
          to="/"
          title="Home"
          aria-label="Home"
        >
          <img
            className="logo__image"
            src={logo}
            alt="Logo company"
            width="113"
            height="90"
          />
        </Link>

        <div className="header__overlay" ref={overlayRef}>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <Link
                  className={`header__menu-link ${
                    location.pathname === "/" ? "is-active" : ""
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="header__menu-item">
                <Link
                  className={`header__menu-link ${
                    location.pathname === "/menu" ? "is-active" : ""
                  }`}
                  to="/menu"
                >
                  Menu
                </Link>
              </li>

              <li className="header__menu-item">
                <Link className="header__menu-link" to="/#about">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          <div
            className={`header__actions ${
              cartCount > 0 ? "header__actions--compact" : ""
            }`}
          >
            <div className="header__shopping">
              <Link
                to="/order"
                className="header__cart button"
                title="Checkout"
                aria-label="Go to order payment"
              >
                <svg
                  className="header__cart-image"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m0 0h24v24h-24z" fill="#fff" opacity="0" />
                  <g fill="#ffffff">
                    <path d="m21.08 7a2 2 0 0 0-1.7-1h-12.8l-.58-2.26a1 1 0 0 0-1-.74h-2a1 1 0 0 0 0 2h1.24l2.76 10.26a1 1 0 0 0 1 .74h9a1 1 0 0 0 .89-.55l3.28-6.56a2 2 0 0 0-.09-1.89zm-4.7 7h-7.62l-1.63-6h12.25z" />
                    <circle cx="7.5" cy="19.5" r="1.5" />
                    <circle cx="17.5" cy="19.5" r="1.5" />
                  </g>
                </svg>
              </Link>
              {cartCount > 0 && (
                <span className="header__cart-count">{cartCount}</span>
              )}
            </div>
            <img
              src={user?.picture || person}
              alt="User Image"
              className="header__user-image"
              width="65"
              height="65"
              onClick={handleLogout}
            />
          </div>
        </div>

        <button
          className="header__burger-button burger-button visible-mobile"
          type="button"
          title="Open menu"
          aria-label="Open menu"
          ref={burgerRef}
        >
          <span className="burger-button__line"></span>
          <span className="burger-button__line"></span>
          <span className="burger-button__line"></span>
        </button>
      </div>
    </div>
  );
};
