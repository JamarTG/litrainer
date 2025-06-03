import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MoveClassificationImages, MoveClassification } from "@/constants/classification";
import Navigation from "./Navigation";

const PuzzleInfo = () => {
  const { classification, playedMove, bestMove, puzzle } = useSelector((state: RootState) => {
    return { ...state.feedback, puzzle: state.puzzle.puzzles[state.puzzle.currentIndex] };
  });

  if (!puzzle) return null;

  // Initial icon (from puzzle evaluation)
  const initialImageSrc = MoveClassificationImages[puzzle.evaluation.judgment?.name as keyof typeof MoveClassification];
  const initialImageAlt = puzzle.evaluation.judgment?.name ?? "move quality";

  // Final icon (from user's classification)
  const finalImageSrc = classification 
    ? MoveClassificationImages[classification as keyof typeof MoveClassification]
    : initialImageSrc;
  const finalImageAlt = classification ?? initialImageAlt;

  const isAttempted = !!(playedMove && classification);

  return (
    <div className="flex flex-col flex-1 justify-start items-center md:justify-center p-2 gap-4 transition-all duration-300 ease-in-out min-h-44">
      <div className="flex items-center gap-3 px-8 py-2 w-full max-w-md rounded-sm  border border-zinc-400 dark:border-zinc-700">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 relative">
          <img
            src={initialImageSrc}
            width={40}
            height={40}
            alt={initialImageAlt}
            className={`absolute transition-opacity duration-500 ease-in-out ${
              isAttempted ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <img
            src={finalImageSrc}
            width={40}
            height={40}
            alt={finalImageAlt}
            className={`absolute transition-opacity duration-500 ease-in-out ${
              isAttempted ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="flex flex-col text-sm text-gray-800 dark:text-white justify-between flex-1 min-w-0">
          <span className="text-sm leading-tight text-gray-600 dark:text-gray-400">
            {isAttempted ? "Your Move" : "You Played"}
          </span>
          <span className="text-xl font-bold leading-tight truncate mb-2">
            {isAttempted ? playedMove : puzzle.userMove?.san ?? "--"}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
            {isAttempted ? "Best Move" : "Find a better move"}
          </span>
          <span className="text-lg leading-tight truncate">
            {isAttempted ? bestMove : "\u00A0"}
          </span>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default PuzzleInfo;