export const fetchMenuData = async () => {
  try {
    const response = await fetch(
      "https://express-vercell-testing.vercel.app/api/menu"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error receiving data:", error);
    return [];
  }
};
