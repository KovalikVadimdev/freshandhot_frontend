import foodbowl from "../assets/images/foodbowl.png";
import Header from "../components/Header/Header";
import FavoriteMenu from "../components/FavoriteMenu/FavoriteMenu";
import CountrySlider from "../components/CountrySlider/CountrySlider";
import RegularMenu from "../components/RegularMenu/RegularMenu";
import Reviews from "../components/Reviews/Reviews";
import Footer from "../blocks/Footer";
import { useState, useEffect } from "react";

const MainPage = () => {
  const [advantages, setAdvantages] = useState([]);

  useEffect(() => {
    const getAdvantages = async () => {
      const response = await fetch(
        "https://express-vercell-testing.vercel.app/api/advantages"
      );
      const data = await response.json();
      setAdvantages(data);
    };

    getAdvantages();
  }, []);

  return (
    <>
      <header className="header">
        <Header />
      </header>

      <main className="content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__main container">
            <div className="hero__body">
              <h1 className="hero__title" id="hero-title">
                <span className="hero__title--highlight">Quick</span> and{" "}
                <span className="hero__title--highlight">
                  Tasty Food Delivered{" "}
                </span>
                with <span className="hero__title--highlight">a Dash of</span>{" "}
                Speed
              </h1>
              <Link className="hero__button button button-large" to="/menu">
                Order Now
              </Link>
            </div>

            <img
              src={foodbowl}
              alt="Food bowl"
              className="hero__image"
              width="500"
              height="500"
            />
          </div>
        </section>
        <section className="overlap" id="about">
          <h2 className="visually-hidden">Our Advantages</h2>
          <div className="overlap__main container">
            <ul className="list">
              {advantages.map(({ id, image, title, text, alt }) => (
                <li className="list__item" key={id}>
                  <img
                    src={image}
                    alt={alt}
                    className="list__image"
                    width="100"
                    height="100"
                  />
                  <div className="list__descriptions">
                    <h3 className="list__title">{title}</h3>
                    <p className="list__text">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="favorite" aria-labelledby="favorite-title">
          <div className="favorite__header-inner container">
            <header className="favorite__header">
              <h2 className="favorite__title" id="favorite-title">
                Our{" "}
                <span className="favorite__title--highlight">
                  Best Delivered
                </span>{" "}
                Indian Dish
              </h2>
              <p className="favorite__text">
                It’s Not Just About Bringing You Good Food From Restaurants, We
                Deliver You Experience
              </p>
            </header>
            <FavoriteMenu />
          </div>

          <CountrySlider />
        </section>
        <section className="regular">
          <RegularMenu />
        </section>
        <Reviews />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default MainPage;
