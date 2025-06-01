import React from "react";
import { NavButton } from "../../types/nav";
import { setIsPuzzleSolved } from "../../redux/slices/feedback";
import { useDispatch } from "react-redux";

interface NavigationalButtonProps {
  btn: NavButton;
}

const NavigationalButton: React.FC<NavigationalButtonProps> = ({ btn }) => {
  const dispatch = useDispatch();

  const navigationalClickHandler = () => {
    dispatch(setIsPuzzleSolved(false));
    dispatch(btn.action!());
  };

  return (
    <button
      key={btn.aria}
      onClick={navigationalClickHandler}
      className={`
                rounded-xl font-semibold text-base sm:text-lg
                bg-blue-500 text-white
                hover:bg-blue-600
                active:scale-95 active:ring-2 active:ring-purple-300
                transition
                w-24 h-14 sm:w-24 sm:h-12
                m-1
              `}
      aria-label={btn.aria}
      type="button"
      style={{
        outline: "none",
        letterSpacing: "0.03em"
      }}
    >
      <span className="flex items-center justify-center h-full">{btn.label}</span>
    </button>
  );
};

export default NavigationalButton;
