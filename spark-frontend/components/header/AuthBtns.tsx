import { useAuth } from "../../contexts/AuthContext";
import { LogOutBtn } from "./LogOutBtn";
import { LogInBtn } from "./LogInBtn";
import { SignUpBtn } from "./SignUpBtn";

export const AuthBtns = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <LogOutBtn />
  ) : (
    <>
      <LogInBtn />
      <SignUpBtn />
    </>
  );
};
