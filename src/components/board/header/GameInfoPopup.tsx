import GameSpeedIcon from "../GameSpeedIcon";
import { Dispatch, SetStateAction } from "react";
import { Puzzle } from "../../../types/puzzle";
import PuzzlePhaseIcon from "./PuzzlePhaseiCON";
import RatedOrCasual from "./RatedOrCasual";
import GameStatus from "./GameStatus";
import OpeningToPractice from "./OpeningToPractice";
import ViewGame from "./ViewGame";

interface GameInfoPopupProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  puzzle: Puzzle;
}

const GameInfoPopup: React.FC<GameInfoPopupProps> = ({ showPopup, setShowPopup, puzzle }) => {
  if (!showPopup) return;

  return (
    <div className="absolute left-1/2 top-full mt-1 z-10 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-700 rounded shadow-lg p-3 min-w-[280px] text-left transform -translate-x-1/2">
      <div className="flex flex-col gap-2">
        <div className="text-xs text-gray-700 dark:text-gray-200">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-md">
              <PuzzlePhaseIcon gamePhase={puzzle.phase} />
              <GameSpeedIcon size="text-3xl" speed={puzzle.timeControl} />
              <RatedOrCasual isRatedGame={puzzle.rated} />
            </div>

            <GameStatus
              gameStatus={puzzle.status}
              gameWinner={puzzle.winner}
              whitePlayer={puzzle.players.white}
              blackPlayer={puzzle.players.black}
            />

            <hr className="mb-2 border-b dark:border-gray-600" />
          </div>

          <div className="flex-col flex justify-center items-start gap-2">
            <ViewGame gameId={puzzle.gameId} moveNumber={puzzle.moveNumber} />
            {puzzle.positionOpening && <OpeningToPractice positionOpening={puzzle.positionOpening} />}
          </div>
        </div>
        <button className="mt-2 text-xs text-blue-500 hover:text-blue-400" onClick={() => setShowPopup(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GameInfoPopup;
