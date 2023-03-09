import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import LogOutBtnStyles from "../../styles/logOutBtn.module.css";

export const LogOutBtn = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { logout } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      router.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <button
      className={LogOutBtnStyles["logout-btn"]}
      onClick={handleLogout}
      data-cy="header-login-btn"
    >
      Log Out
    </button>
  );
};
