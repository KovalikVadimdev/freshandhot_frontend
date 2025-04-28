import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const ReviewsView = ({ reviews }) => {
  return (
    <section className="reviews">
      <div className="reviews__inner container">
        <h2 className="reviews__title">Reviews</h2>
        <div className="reviews__swiper swiper">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={reviews.length > 0}
            centeredSlides={true}
            effect="coverflow"
            modules={[Navigation, EffectCoverflow]}
            coverflowEffect={{
              rotate: 0,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              1024: { slidesPerView: 3 },
              300: { slidesPerView: 1 },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="reviews__slide">
                <h3 className="reviews__name">{review.name}</h3>
                <p className="reviews__text">{review.text}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsView;
