import Link from "next/link";
import { useRouter } from "next/router";
import signUpBtnStyles from "../../styles/signUpBtn.module.css";

export const SignUpBtn = () => {
  const router = useRouter();
  return (
    <button
      className={signUpBtnStyles["signup-btn"]}
      // onClick={() => router.push("/signup")}
      data-cy="header-signup-btn"
    >
      <Link href="/signup">Sign Up</Link>
    </button>
  );
};
