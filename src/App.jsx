import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./contexts/OrderProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import MainPage from "./pages/Main";
import MenuPage from "./pages/Menu";
import OrderPage from "./pages/Order/Order";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  return (
    <OrderProvider>
      <AuthProvider>
        <Router>
          {/* <Router> */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </OrderProvider>
  );
};

export default App;
