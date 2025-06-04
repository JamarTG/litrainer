import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import GameInfoButton from "../../header/game-info/GameInfoButton";
import GameInfoPopup from "../../header/game-info/GameInfoPopup";

const GameInfo = () => {
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

export default GameInfo;
