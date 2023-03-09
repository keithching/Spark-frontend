import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import headerStyles from "../../styles/header.module.css";

const AuthenticatedUtilites = () => {
  const { currentUser } = useAuth();
  return (
    currentUser && (
      <>
        <button className={headerStyles.utilButton}>
          <Link href="/dashboard">Dashboard</Link>
        </button>
        <button className={headerStyles.utilButton}>
          <Link href="/profile">Profile</Link>
        </button>
      </>
    )
  );
};

export default AuthenticatedUtilites;
