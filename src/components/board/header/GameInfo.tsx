import SubmitButtonWithModal from "@/components/form/SubmitButtonWithModal";
import useClickOutside from "@/hooks/useClickOutside";
import { RootState } from "@/redux/store";
import { Info } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import GameInfoPopup from "./GameInfoPopup";
import { ICON_SIZES } from "@/components/constants";



const GameInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  useClickOutside(dropdownRef, setShowPopup, showPopup);

  const toggleGameInfoPopup = () => setShowPopup((showPopup) => !showPopup);

  if (!puzzle) return <SubmitButtonWithModal />;

  return (
    <div className="h-full flex justify-center items-center" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex gap-1 items-center focus:outline-none"
        onClick={toggleGameInfoPopup}
        aria-haspopup="true"
        aria-expanded={showPopup}
        title="Get Additional Game Info"
      >
        <Info size={ICON_SIZES.MEDIUM} />
      </button>

      <GameInfoPopup showPopup={showPopup} setShowPopup={setShowPopup} puzzle={puzzle} />
    </div>
  );
};

export default GameInfo;
