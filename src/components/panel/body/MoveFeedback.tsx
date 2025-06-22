import { getBestMove, getPlayedMove, hasAttempted } from "@/redux/slices/feedback";
import { getPuzzle } from "@/redux/slices/puzzle";
import { useSelector } from "react-redux";

const MoveFeedback = () => {
  const bestMove = useSelector(getBestMove);
  const puzzle = useSelector(getPuzzle);
  const puzzleAttemptMove = useSelector(getPlayedMove);
  const isPuzzleAttempted = useSelector(hasAttempted);

  const UI_TEXT = {
    PUZZLE_CONTEXT: "Your Move",
    GAME_CONTEXT: "You Played",
    BEST_MOVE_PROMPT: "Best Move",
    FIND_BETTER_MOVE_PROMPT: "Find a better move"
  };

  const renderMoveContext = () => (isPuzzleAttempted ? UI_TEXT.PUZZLE_CONTEXT : UI_TEXT.GAME_CONTEXT);
  const renderMovePlayed = () => (isPuzzleAttempted ? puzzleAttemptMove : (puzzle.userMove?.san ?? "--"));
  const renderMovePrompt = () => (isPuzzleAttempted ? UI_TEXT.BEST_MOVE_PROMPT : UI_TEXT.FIND_BETTER_MOVE_PROMPT);
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

export default MoveFeedback;
