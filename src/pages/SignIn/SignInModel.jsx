export const loginWithEmail = async (email, password) => {
  try {
    const response = await fetch(
      "https://express-vercell-testing.vercel.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const getUserInfoFromGoogle = async (accessToken) => {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await res.json();
    return {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
    };
  } catch (error) {
    console.error("Google user fetch error:", error);
    return null;
  }
};

export const getUserInfoFromFacebook = async (accessToken) => {
  try {
    return new Promise((resolve, reject) => {
      window.FB.api(
        "/me",
        { fields: "name,email,picture", access_token: accessToken },
        function (response) {
          if (!response || response.error) {
            reject(response.error);
          } else {
            resolve({
              name: response.name,
              email: response.email,
              picture: response.picture.data.url,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error("Facebook user fetch error:", error);
    return null;
  }
};
