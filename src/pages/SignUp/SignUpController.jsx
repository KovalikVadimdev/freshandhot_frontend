// SignUpController.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/useAuth";
import { validateForm, registerUser } from "./SignUpModel";

export const useSignUpController = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, errors } = validateForm(username, email, password);
    setErrors(errors);

    if (valid) {
      try {
        const { status, data } = await registerUser(username, email, password);
        localStorage.setItem("token", data.token);

        if (status === 201) {
          setTimeout(() => {
            alert("Registration successful!");
            navigate("/");
          }, 1000);
        } else {
          alert("Failed to register a user");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const userData = await res.json();
        login({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
        });
        alert("Login successful!");
        navigate("/");
      } catch (error) {
        console.error("Error receiving user data:", error);
      }
    },
    onError: (error) => {
      console.error("Authorization error:", error);
    },
  });

  const handleFacebookLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          window.FB.api(
            "/me",
            { fields: "name,email,picture", access_token: accessToken },
            function (userInfo) {
              login({
                name: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture.data.url,
              });
              navigate("/");
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
    handleGoogleLogin,
    handleFacebookLogin,
  };
};
