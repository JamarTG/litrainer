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
}

const GameInfoTriggerButton: React.FC<GameInfoTriggerButtonProps> = ({ buttonClassName, iconSize, showLabel = true, iconOverride }) => {
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setShowPopup, showPopup);

  const toggleGameInfoPopup = () => setShowPopup((showPopup) => !showPopup);

  return (
    <div className="relative h-full w-full flex justify-center items-center" ref={dropdownRef}>
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