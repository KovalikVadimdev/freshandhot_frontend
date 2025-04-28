import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
