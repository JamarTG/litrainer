import { useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import useClickOutside from "../../../hooks/useClickOutside";
import { RootState } from "../../../redux/store";
import SubmitButtonWithModal from "../../form/SubmitButtonWithModal";
import GameInfoPopup from "./GameInfoPopup";

const GameInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activePuzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);

  useClickOutside(dropdownRef, setShowPopup, showPopup);

  const toggleShowGameInfo = () => {
    setShowPopup((showPopup) => !showPopup);
  };

  if (!activePuzzle) {
    return <SubmitButtonWithModal />;
  }

  return (
    <div className="h-full flex justify-center items-center" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex gap-1 items-center focus:outline-none"
        onClick={toggleShowGameInfo}
        aria-haspopup="true"
        aria-expanded={showPopup}
        title="Get Additional Game Info"
      >
        <FaInfoCircle className="text-2xl" />
      </button>

      <GameInfoPopup showPopup={showPopup} setShowPopup={setShowPopup} puzzle={activePuzzle} />
    </div>
  );
};

export default GameInfo;
