import { getBestMove, getPlayedMove, hasAttempted, getClassification } from "@/state/slices/feedback";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/typing/enums";
import { getPuzzle } from "@/state/slices/puzzle";
import { useSelector } from "react-redux";

const MoveFeedback = () => {
  const puzzleAttemptMove = useSelector(getPlayedMove);
  const isPuzzleAttempted = useSelector(hasAttempted);
  const bestMove = useSelector(getBestMove);
  const puzzle = useSelector(getPuzzle);
  const classification = useSelector(getClassification);

  const renderMoveContext = () => (isPuzzleAttempted ? "Your Move" : "You Played");
  const renderMovePlayed = () => (isPuzzleAttempted ? puzzleAttemptMove : (puzzle.userMove?.san ?? "--"));
  const renderMovePrompt = () => (isPuzzleAttempted ? "Best Move" : "Find a better move");
  const renderBestMove = () => (isPuzzleAttempted ? bestMove : "\u00A0");

  // Determine icon for the best move classification (if available)
  const bestMoveClassification = classification ?? MoveClassification.best;
  const bestMoveIcon = CLASSIFICATION_IMAGES[bestMoveClassification] ?? undefined;

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
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate flex items-center gap-2">
        {bestMoveIcon && <img src={bestMoveIcon} alt={bestMoveClassification} className="w-5 h-5 inline-block align-middle" />}
        {renderBestMove()}
      </span>
    </div>
  );
};

export default MoveFeedback;
