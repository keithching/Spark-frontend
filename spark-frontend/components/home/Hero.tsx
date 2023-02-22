import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import HeroStyles from "../../styles/hero.module.css";
import { LogInBtn } from "../header/LogInBtn";
import { SignUpBtn } from "../header/SignUpBtn";
import useOnScreen from "../../utils/useOnScreen";

const Child = ({ loaded }) => {
  const divRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLHeadingElement>();
  const subheaderRef = useRef<HTMLHeadingElement>();

  useEffect(() => {
    if (!loaded.current && headerRef.current) {
      loaded.current = true;
      setTimeout(() => {
        divRef.current.classList.add(HeroStyles["lazy_div--loaded"]);
      }, 500);
      setTimeout(() => {
        headerRef.current.classList.add(HeroStyles["header--loaded"]);
      }, 500);
      setTimeout(() => {
        subheaderRef.current.classList.add(HeroStyles["subheader--loaded"]);
      }, 1000);
    }
  });

  return (
    <div ref={divRef} className={classNames(HeroStyles.lazy_div)}>
      <h1 ref={headerRef} className={classNames(HeroStyles.header)}>
        your next adventure awaits.
      </h1>
      <div ref={subheaderRef} className={classNames(HeroStyles.subheader)}>
        <h2>choose your next destiny by picking your favourite events</h2>
        <div className={classNames(HeroStyles.buttons)}>
          {/* <LogInBtn /> */}
          {/* <SignUpBtn /> */}
          <a href="#events">
            <button className={HeroStyles.viewEventsBtn}>View Events</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const loaded = useRef<boolean>(false);
  const { currentUser } = useAuth();
  const childRef = useRef();
  const childRefValue = useOnScreen(childRef);
  const [isChildRef, setIsChildRef] = useState(false);

  useEffect(() => {
    if (!isChildRef) setIsChildRef(childRefValue);
  }, [isChildRef, childRefValue]);

  const style = {
    height: "1000px",
    backgroundColor: "#eee",
  };

  return (
    <>
      <div className={HeroStyles.lazy} ref={childRef}>
        {isChildRef && <Child loaded={loaded} />}
      </div>
    </>
  );
}
