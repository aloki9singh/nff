import { useRef, useEffect } from "react";

const useHoverOutside = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const handleHoverOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && event.target !== document.documentElement) {
        handler();
      }
    };

    document.addEventListener("mouseover", handleHoverOutside);
    return () => {
      document.removeEventListener("mouseover", handleHoverOutside);
    };
  }, [handler]);

  return ref;
};

export default useHoverOutside;
