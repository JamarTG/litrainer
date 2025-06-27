import useClickOutside from "@/hooks/panel/useClickOutside";
import { useRef, useState } from "react";
import GameInfoPopup from "./components/GameInfoPopup";
import GameInfoButton from "./components/GameInfoButton";

const GameInfoTriggerButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, setShowPopup, showPopup);

  const toggleGameInfoPopup = () => setShowPopup((showPopup) => !showPopup);

  return (
    <div className="h-full flex justify-center items-center" ref={dropdownRef}>
      <GameInfoButton toggleGameInfoPopup={toggleGameInfoPopup} showPopup={showPopup} />
      <GameInfoPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
};

export default GameInfoTriggerButton;
