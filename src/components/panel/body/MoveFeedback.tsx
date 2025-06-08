import { getBestMove, getPlayedMove, hasAttempted } from "@/redux/slices/feedback";
import { getPuzzle } from "@/redux/slices/puzzle";
import { useSelector } from "react-redux";

const MoveFeedback = () => {
  const bestMove = useSelector(getBestMove);
  const puzzle = useSelector(getPuzzle);
  const playedMove = useSelector(getPlayedMove);
  const attemptedPuzzle = useSelector(hasAttempted);

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
        {attemptedPuzzle ? "Your Move" : "You Played"}
      </span>
      <span className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white truncate">
        {attemptedPuzzle ? playedMove : (puzzle.userMove?.san ?? "--")}
      </span>
      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide mt-3">
        {attemptedPuzzle ? "Best Move" : "Find a better move"}
      </span>
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
        {attemptedPuzzle ? bestMove : "\u00A0"}
      </span>
    </div>
  );
};

export default MoveFeedback;
