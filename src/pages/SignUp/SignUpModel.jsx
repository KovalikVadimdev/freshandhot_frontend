export const validateForm = (username, email, password) => {
  let valid = true;
  const errors = { username: "", email: "", password: "" };

  if (!username) {
    errors.username = "Username is required";
    valid = false;
  } else if (username.length < 6) {
    errors.username = "Username must be at least 6 characters";
    valid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Enter a valid email address";
    valid = false;
  }

  if (!password) {
    errors.password = "Password is required";
    valid = false;
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    valid = false;
  }

  return { valid, errors };
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(
    "https://express-vercell-testing.vercel.app/api/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, email, password }),
    }
  );

  const data = await response.json();
  return { status: response.status, data };
};
