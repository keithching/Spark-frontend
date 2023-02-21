// https://betterprogramming.pub/lazy-loading-in-next-js-simplified-435681afb18a
import { useEffect, useState } from "react";

const useOnScreen = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  return isIntersecting;
};

export default useOnScreen;
