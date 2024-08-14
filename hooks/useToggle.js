import { useCallback, useEffect, useRef, useState } from "react";

const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);


  return {
    isOpen,
    setIsOpen,
    toggle,
    ref,
  };
};

export default useToggle;
