import useClickOutside from "@/hooks/panel/useClickOutside";
import { ReactNode } from "react";
import { useRef, useState } from "react";
import GameInfoPopup from "./GameInfoPopup";
import GameInfoButton from "./GameInfoButton";

interface GameInfoTriggerButtonProps {
  buttonClassName?: string;
  iconSize?: number;
  showLabel?: boolean;
  iconOverride?: ReactNode;
  fullWidth?: boolean;
}

const GameInfoTriggerButton: React.FC<GameInfoTriggerButtonProps> = ({ buttonClassName, iconSize, showLabel = true, iconOverride, fullWidth = true }) => {
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setShowPopup, showPopup);

  const toggleGameInfoPopup = () => setShowPopup((showPopup) => !showPopup);

  return (
    <div className={`relative flex justify-center items-center ${fullWidth ? "h-full w-full" : "h-fit w-fit"}`} ref={dropdownRef}>
      <GameInfoButton
        toggleGameInfoPopup={toggleGameInfoPopup}
        showPopup={showPopup}
        className={buttonClassName}
        iconSize={iconSize}
        showLabel={showLabel}
        iconOverride={iconOverride}
      />
      <GameInfoPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
};

export default GameInfoTriggerButton;