import { createPopper } from "@popperjs/core";
import { useState, useRef, useEffect } from "react";

const usePopperDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current && dropdownRef.current) {
      const popperInstance = createPopper(triggerRef.current, dropdownRef.current, {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 5]
            }
          }
        ]
      });

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        popperInstance.destroy();
      };
    }
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleDropdown, triggerRef, dropdownRef };
};

export default usePopperDropDown;
