import { useEffect, useState } from "react";
import headerStyles from "../../styles/header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Cart } from "./Cart";

const Header = () => {
  const router = useRouter();

  // to implement:
  // view for event provider
  // view for user
  // a state for controlling views

  const [error, setError] = useState<string>("");
  const { isLoading, currentUser, logout } = useAuth();

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
    <div className={headerStyles.Header}>
      <nav className={headerStyles.brand}>
        <Link href="/">Spark</Link>
      </nav>
      <div className={headerStyles["nav-utilities"]}>
        {!isLoading && (
          <>
            {error && <span>{error}</span>}
            {currentUser ? (
              <div className={headerStyles["user-greeting"]}>
                <div className={headerStyles["profile-image"]}>
                  <Image
                    src={currentUser.photoURL ? currentUser.photoURL : ""}
                    alt=""
                    width={30}
                    height={30}
                    objectFit="cover"
                  />
                </div>
                <span>{currentUser.displayName}</span>
              </div>
            ) : (
              "こんにちは！"
            )}
            {currentUser ? (
              <>
                <button onClick={() => router.push("/dashboard")}>
                  Dashboard
                </button>
                <button onClick={() => router.push("/profile")}>Profile</button>
                <button onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              <>
                <button
                  className={headerStyles["login-btn"]}
                  onClick={() => router.push("/login")}
                >
                  Log In
                </button>
                <button
                  className={headerStyles["signup-btn"]}
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
            <Cart />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
