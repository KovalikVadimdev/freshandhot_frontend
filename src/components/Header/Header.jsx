import { HeaderView } from "./HeaderView";
import { useHeaderController } from "./HeaderController";

const Header = () => {
  const { overlayRef, burgerRef, handleLogout, user, cartCount } =
    useHeaderController();

  return (
    <HeaderView
      overlayRef={overlayRef}
      burgerRef={burgerRef}
      handleLogout={handleLogout}
      user={user}
      cartCount={cartCount}
    />
  );
};

export default Header;
