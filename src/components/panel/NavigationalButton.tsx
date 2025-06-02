import React from "react";
import { NavButton } from "../../types/nav";
import { setIsPuzzleSolved } from "../../redux/slices/feedback";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface NavigationalButtonProps {
  btn: NavButton;
  icon?: React.ReactNode;
}

const NavigationalButton: React.FC<NavigationalButtonProps> = ({ btn, icon }) => {
  const dispatch = useDispatch();
  const engineIsRunning = useSelector((state: RootState) => state.engine.isRunning);
  const navigationalClickHandler = () => {
    dispatch(setIsPuzzleSolved(false));
    dispatch(btn.action!());
  };

  return (
    <button
      key={btn.aria}
      onClick={navigationalClickHandler}
      disabled={engineIsRunning}
      className="
        bg-accent 
        rounded-lg 
        text-sm 
        text-textwhite 
        flex 
        items-center 
        h-[32px] 
        px-3 
        max-w-fit 
        cursor-pointer 
        hover:bg-accent/90 
        active:scale-95 
        transition 
        focus:outline-none
      "
      aria-label={btn.aria}
      type="button"
    >
      {icon && <span className="mr-2 flex items-center text-textwhite">{icon}</span>}
      <span>{btn.label}</span>
    </button>
  );
};

export default NavigationalButton;
