import { useRouter } from "next/router";
import signUpBtnStyles from "../../styles/signUpBtn.module.css";

export const SignUpBtn = () => {
  const router = useRouter();
  return (
    <button
      className={signUpBtnStyles["signup-btn"]}
      onClick={() => router.push("/signup")}
    >
      Sign Up
    </button>
  );
};
