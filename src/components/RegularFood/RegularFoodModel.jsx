export const fetchMenuItems = async () => {
  const response = await fetch(
    "https://express-vercell-testing.vercel.app/api/menu"
  );
  const data = await response.json();
  return data;
};
