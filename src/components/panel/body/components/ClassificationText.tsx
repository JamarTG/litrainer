import { getBestMove, getPlayedMove, hasAttempted } from "@/redux/slices/feedback";
import { getPuzzle } from "@/redux/slices/puzzle";
import { useSelector } from "react-redux";

const ClassificationText = () => {
  const puzzleAttemptMove = useSelector(getPlayedMove);
  const isPuzzleAttempted = useSelector(hasAttempted);
  const bestMove = useSelector(getBestMove);
  const puzzle = useSelector(getPuzzle);

  const renderMoveContext = () => (isPuzzleAttempted ? "Your Move" : "You Played");
  const renderMovePlayed = () => (isPuzzleAttempted ? puzzleAttemptMove : (puzzle.userMove?.san ?? "--"));
  const renderMovePrompt = () => (isPuzzleAttempted ? "Best Move" : "Find a better move");
  const renderBestMove = () => (isPuzzleAttempted ? bestMove : "\u00A0");

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
        {renderMoveContext()}
      </span>
      <span className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white truncate">
        {renderMovePlayed()}
      </span>
      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide mt-3">
        {renderMovePrompt()}
      </span>
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">{renderBestMove()}</span>
    </div>
  );
};

export default ClassificationText;
