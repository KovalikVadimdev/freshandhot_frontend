// HeaderController.js
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeaderModel } from "./HeaderModel";
import { useLocation } from "react-router-dom";

export const useHeaderController = () => {
  const overlayRef = useRef(null);
  const burgerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, cartCount } = useHeaderModel();

  useEffect(() => {
    const burgerBtn = burgerRef.current;
    const overlay = overlayRef.current;

    const toggleMenu = () => {
      if (burgerBtn && overlay) {
        burgerBtn.classList.toggle("is-active");
        overlay.classList.toggle("is-active");
        document.documentElement.classList.toggle("is-lock");
      }
    };

    if (burgerBtn) {
      burgerBtn.addEventListener("click", toggleMenu);
    }

    return () => {
      if (burgerBtn) {
        burgerBtn.removeEventListener("click", toggleMenu);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("is-lock");
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return { overlayRef, burgerRef, handleLogout, user, cartCount };
};
