import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import HeroStyles from "../../styles/hero.module.css";
import { LogInBtn } from "../header/LogInBtn";
import { SignUpBtn } from "../header/SignUpBtn";
import { AiOutlineReload } from "react-icons/Ai";
import useOnScreen from "../../utils/useOnScreen";

const Child = ({ loaded }) => {
  const imgRef = useRef<HTMLImageElement>();

  function loadImage(img) {
    img.src = img.getAttribute("data-src");
  }

  useEffect(() => {
    if (!loaded.current && imgRef.current) {
      loadImage(imgRef.current);
      loaded.current = true;
      setTimeout(() => {
        imgRef.current.classList.add(HeroStyles["lazy_img--loaded"]);
      }, 1000);
    }
  });

  return (
    <img
      ref={imgRef}
      className={classNames(HeroStyles.lazy_img)}
      data-src="/images/twitter.png"
    />
  );
};

export default function Hero() {
  const loaded = useRef<boolean>(false);
  const { currentUser } = useAuth();
  // const imgRef = useRef<HTMLImageElement>();
  // const offset = useRef<number>();
  // const loaded = useRef<boolean>(false);

  const childRef = useRef();
  const childRefValue = useOnScreen(childRef);
  const [isChildRef, setIsChildRef] = useState(false);

  useEffect(() => {
    if (!isChildRef) setIsChildRef(childRefValue);
  }, [childRefValue]);

  const style = {
    height: "1000px",
    backgroundColor: "#eee",
  };

  // function loadImage(img) {
  //   img.src = img.getAttribute("data-src");
  // }

  // function handleScrollEvent() {
  //   if (!loaded.current && window.scrollY > offset.current) {
  //     loadImage(imgRef.current);
  //     console.log("loaded!");
  //     loaded.current = true;
  //     imgRef.current.classList.remove(HeroStyles["lazy_img--loading"]);
  //   }
  // }

  // useEffect(() => {
  //   if (!loaded.current) {
  //     offset.current =
  //       imgRef.current.getBoundingClientRect().top +
  //       window.scrollY -
  //       window.innerHeight;
  //     console.log(offset.current);
  //     imgRef.current.classList.add(HeroStyles["lazy_img--loading"]);

  //     if (offset.current < 0 || offset.current === 0) {
  //       loadImage(imgRef.current);
  //       loaded.current = true;
  //       imgRef.current.classList.remove(HeroStyles["lazy_img--loading"]);
  //     }

  //     window.addEventListener("scroll", handleScrollEvent);
  //   } else {
  //     window.removeEventListener("scroll", handleScrollEvent);
  //   }
  // });

  return (
    // <div className={HeroStyles.container}>
    //   <h1 className={HeroStyles.header}>your next adventure awaits.</h1>
    //   <div className={HeroStyles.buttons}>
    //     {!currentUser && (
    //       <>
    //         <LogInBtn />
    //         <SignUpBtn />
    //       </>
    //     )}
    //   </div>

    //   </div>
    <>
      <div style={style}>A large div</div>
      {/* <div className={HeroStyles.lazy}>
        <img
          ref={imgRef}
          className={classNames(HeroStyles.lazy_img)}
          data-src="/images/twitter.png"
        />
      </div> */}
      <div className={HeroStyles.lazy} ref={childRef}>
        {isChildRef && <Child loaded={loaded} />}
      </div>
    </>
  );
}
