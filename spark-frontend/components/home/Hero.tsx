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
    if (containerRef.current) {
      containerRef.current.classList.add(HeroStyles["lazy_div--loaded"]);
    }
  }
  function addHeaderLoadedClass() {
    if (headerRef.current) {
      headerRef.current.classList.add(HeroStyles["header--loaded"]);
    }
  }
  function addSubheaderLoadedClass() {
    if (subheaderRef.current) {
      subheaderRef.current.classList.add(HeroStyles["subheader--loaded"]);
    }
  }

  const [containerTimeoutId, setContainerTimeoutId] = useState<any>();
  const [headerTimeoutId, setHeaderTimeoutId] = useState<any>();
  const [subheaderTimeoutId, setSubheaderTimeoutId] = useState<any>();

  useEffect(() => {
    // let containerTimeoutId, headerTimeoutId, subheaderTimeoutId;

    if (!loaded.current) {
      setContainerTimeoutId(setTimeout(addContainerLoadedClass, 500));
      setHeaderTimeoutId(setTimeout(addHeaderLoadedClass, 500));
      setSubheaderTimeoutId(setTimeout(addSubheaderLoadedClass, 1000));
      loaded.current = true;
    }

    return () => {
      if (containerTimeoutId) clearTimeout(containerTimeoutId);
      if (headerTimeoutId) clearTimeout(headerTimeoutId);
      if (subheaderTimeoutId) clearTimeout(subheaderTimeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className={classNames(HeroStyles.lazy_div)}>
      <h1
        ref={headerRef}
        className={classNames(HeroStyles.header)}
        data-cy="hero-header"
      >
        your next adventure awaits.
      </h1>
      <div
        ref={subheaderRef}
        className={classNames(HeroStyles.subheader)}
        data-cy="hero-subheader"
      >
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
