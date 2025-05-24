import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  isOpen: boolean
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, ref, setIsOpen]);
};

export default useClickOutside;
