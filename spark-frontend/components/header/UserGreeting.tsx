import userGreetingStyles from "../../styles/userGreeting.module.css";
import classNames from "classnames";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";

const UserAvatarName = ({ hamburgerIsClicked, currentUser }) => {
  return (
    <div
      className={classNames(
        userGreetingStyles["user-greeting"],
        hamburgerIsClicked && userGreetingStyles.userGreetingSideMenu
      )}
    >
      <div className={userGreetingStyles["profile-image"]}>
        <Image
          src={currentUser.photoURL ? currentUser.photoURL : ""}
          alt=""
          width={hamburgerIsClicked ? 50 : 30}
          height={hamburgerIsClicked ? 50 : 30}
        />
      </div>
      <span>{currentUser.displayName}</span>
    </div>
  );
};

const UserGreeting = ({ hamburgerIsClicked }) => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <UserAvatarName
      hamburgerIsClicked={hamburgerIsClicked}
      currentUser={currentUser}
    />
  ) : (
    <div className={classNames(userGreetingStyles.guestGreeting)}>
      こんにちは！
    </div>
  );
};

export default UserGreeting;
