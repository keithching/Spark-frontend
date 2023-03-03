import { useRouter } from "next/router";
import LogInBtnStyles from "../../styles/logInBtn.module.css";

export const LogInBtn = () => {
  const router = useRouter();

  return (
    <button
      className={LogInBtnStyles["login-btn"]}
      onClick={() => router.push("/login")}
      data-cy="header-login-btn"
    >
      Log In
    </button>
  );
};
