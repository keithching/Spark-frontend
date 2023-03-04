import { useEffect, useState } from "react";
import headerStyles from "../../styles/header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Cart } from "./Cart";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import classNames from "classnames";
import { useRole } from "../../utils/helper";
import { ThemeSwitch } from "./ThemeSwitch";
import { LogInBtn } from "./LogInBtn";
import { SignUpBtn } from "./SignUpBtn";
import Brand from "./Brand";
import UserGreeting from "./UserGreeting";

const Header = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { isLoading, currentUser, logout } = useAuth();
  const { role } = useRole(currentUser?.email);
  const [hamburgerIsClicked, setHamburgerIsClicked] = useState(false);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      router.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    const handleWindowResize = () => setHamburgerIsClicked(false);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const Hamburger = () => {
    return (
      <div
        className={classNames(headerStyles.hamburgerMenu)}
        onClick={() => setHamburgerIsClicked((prev) => !prev)}
      >
        {hamburgerIsClicked ? <RxCross1 /> : <RxHamburgerMenu />}
      </div>
    );
  };

  const SideMenu = () => {
    return (
      <div className={classNames(headerStyles.sideMenu)}>
        <UserGreeting hamburgerIsClicked={hamburgerIsClicked} />
        {role.role !== "provider" && (
          <Cart hamburgerIsClicked={hamburgerIsClicked} />
        )}
        {currentUser ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <span onClick={handleLogout}>Log Out</span>
          </>
        ) : (
          <>
            <Link href="/login">Log In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={headerStyles.Header}>
      <Brand />
      <div className={headerStyles["nav-utilities"]}>
        {!isLoading && (
          <>
            {error && <span>{error}</span>}
            <UserGreeting hamburgerIsClicked={hamburgerIsClicked} />
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
                <LogInBtn />
                <SignUpBtn />
              </>
            )}
            {role.role !== "provider" && (
              <Cart hamburgerIsClicked={hamburgerIsClicked} />
            )}
            <ThemeSwitch />
          </>
        )}
      </div>
      <div className={classNames(headerStyles.mobileDevice)}>
        <ThemeSwitch />
        <Hamburger />
        {hamburgerIsClicked && <SideMenu />}
      </div>
    </div>
  );
};

export default Header;
