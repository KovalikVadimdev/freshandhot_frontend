export const fetchReviewsItems = async () => {
  const response = await fetch(
    "https://express-vercell-testing.vercel.app/api/reviews"
  );
  const data = await response.json();
  return data;
};
