import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import star from "../../assets/icons/star.svg";
import "swiper/css";

const CountrySliderView = ({ cities }) => {
  return (
    <Swiper
      className="country favorite__country"
      loop={true}
      speed={4000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      breakpoints={{
        1440: { slidesPerView: 5 },
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 3 },
        425: { slidesPerView: 2 },
        300: { slidesPerView: 1 },
      }}
    >
      {cities.map((city, index) => (
        <SwiperSlide className="country__slide" key={index}>
          <img className="country__image" src={star} alt="star" />
          <p className="country__text">{city}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CountrySliderView;
