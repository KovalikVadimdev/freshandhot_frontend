import { useSignUpController } from "./SignUpController";
import { SignUpView } from "./SignUpView";

const SignUp = () => {
  const controllerProps = useSignUpController();
  return <SignUpView {...controllerProps} />;
};

export default SignUp;
