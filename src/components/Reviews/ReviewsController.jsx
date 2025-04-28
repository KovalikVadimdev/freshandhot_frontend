import React from "react";
import ReviewsView from "./ReviewsView";
import { fetchReviewsItems } from "./ReviewsModel";
import { useState, useEffect } from "react";

const ReviewsController = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchReviewsItems();
      setReviews(data);
    };

    fetchReviews();
  }, []);
  return <ReviewsView reviews={reviews} />;
};

export default ReviewsController;
