import Link from "next/link";
import LogInBtnStyles from "../../styles/logInBtn.module.css";

export const LogInBtn = () => {
  return (
    <button className={LogInBtnStyles["login-btn"]} data-cy="header-login-btn">
      <Link href="/login">Log In</Link>
    </button>
  );
};
