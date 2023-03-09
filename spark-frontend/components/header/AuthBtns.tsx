import { useAuth } from "../../contexts/AuthContext";
import AuthBtnsStyle from "../../styles/authBtns.module.css";
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
