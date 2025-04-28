import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/useAuth";
import {
  loginWithEmail,
  getUserInfoFromGoogle,
  getUserInfoFromFacebook,
} from "./SignInModel";

const SignInController = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginWithEmail(email, password);
    if (success) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Login failed!");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userData = await getUserInfoFromGoogle(tokenResponse.access_token);
      if (userData) {
        login(userData);
        alert("Login successful!");
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Google login error", error);
    },
  });

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1178419584021862",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      async (response) => {
        if (response.authResponse) {
          const userInfo = await getUserInfoFromFacebook(
            response.authResponse.accessToken
          );
          if (userInfo) {
            login(userInfo);
            navigate("/");
          }
        } else {
          console.log("User cancelled login or did not authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return {
    email,
    password,
    showPassword,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
    handleGoogleLogin,
    handleFacebookLogin,
  };
};

export default SignInController;
