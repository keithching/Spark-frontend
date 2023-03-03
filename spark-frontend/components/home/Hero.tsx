import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import HeroStyles from "../../styles/hero.module.css";
import { LogInBtn } from "../header/LogInBtn";
import { SignUpBtn } from "../header/SignUpBtn";
import useOnScreen from "../../utils/useOnScreen";

const Child = ({ loaded }) => {
  const containerRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLHeadingElement>();
  const subheaderRef = useRef<HTMLHeadingElement>();

  function addContainerLoadedClass() {
    containerRef.current.classList.add(HeroStyles["lazy_div--loaded"]);
  }
  function addHeaderLoadedClass() {
    headerRef.current.classList.add(HeroStyles["header--loaded"]);
  }
  function addSubheaderLoadedClass() {
    subheaderRef.current.classList.add(HeroStyles["subheader--loaded"]);
  }

  useEffect(() => {
    let containerTimeoutId, headerTimeoutId, subheaderTimeoutId;

    if (!loaded.current && headerRef.current) {
      loaded.current = true;

      containerTimeoutId = setTimeout(addContainerLoadedClass, 500);
      headerTimeoutId = setTimeout(addHeaderLoadedClass, 500);
      subheaderTimeoutId = setTimeout(addSubheaderLoadedClass, 1000);
    }

    return () => {
      if (containerTimeoutId) clearTimeout(containerTimeoutId);
      if (headerTimeoutId) clearTimeout(headerTimeoutId);
      if (subheaderTimeoutId) clearTimeout(subheaderTimeoutId);
    };
  });

  return (
    <div ref={containerRef} className={classNames(HeroStyles.lazy_div)}>
      <h1 ref={headerRef} className={classNames(HeroStyles.header)}>
        your next adventure awaits.
      </h1>
      <div ref={subheaderRef} className={classNames(HeroStyles.subheader)}>
        <h2>choose your next destination by picking your favourite events</h2>
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
