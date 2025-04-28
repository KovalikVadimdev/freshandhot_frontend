import SignInController from "./SignInController";
import SignInView from "./SignInView";

const SignIn = () => {
  const controller = SignInController();
  return <SignInView {...controller} />;
};

export default SignIn;
