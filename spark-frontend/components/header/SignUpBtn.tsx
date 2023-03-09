import Link from "next/link";
import signUpBtnStyles from "../../styles/signUpBtn.module.css";

export const SignUpBtn = () => {
  return (
    <button
      className={signUpBtnStyles["signup-btn"]}
      data-cy="header-signup-btn"
    >
      <Link href="/signup">Sign Up</Link>
    </button>
  );
};
