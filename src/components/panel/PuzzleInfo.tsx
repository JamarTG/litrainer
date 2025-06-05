import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MoveClassificationImages, MoveClassification } from "@/constants/classification";
import Navigation from "./Navigation";

const PuzzleInfo = () => {
  const classification = useSelector((state: RootState) => state.feedback.classification);
  const playedMove = useSelector((state: RootState) => state.feedback.playedMove);
  const bestMove = useSelector((state: RootState) => state.feedback.bestMove);
  const currentPuzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[currentPuzzleIndex]);

  if (!puzzle) return null;

  const initialImageSrc = MoveClassificationImages[puzzle.evaluation.judgment?.name as keyof typeof MoveClassification];
  const initialImageAlt = puzzle.evaluation.judgment?.name ?? "move quality";

  const finalImageSrc = classification
    ? MoveClassificationImages[classification as keyof typeof MoveClassification]
    : initialImageSrc;
  const finalImageAlt = classification ?? initialImageAlt;

  const isAttempted = !!(playedMove && classification);

  return (
    <div className="flex flex-col flex-1 justify-start items-center md:justify-center p-4 gap-6 min-h-48 rounded-lg transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4 w-full max-w-md border border-zinc-400 dark:border-zinc-700 rounded-md p-4 bg-zinc-200/75 dark:bg-zinc-800">
        <div className="w-12 h-12 relative flex-shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700 shadow-inner flex items-center justify-center overflow-hidden">
          <img
            src={initialImageSrc}
            width={54}
            height={54}
            alt={initialImageAlt}
            className={`absolute transition-opacity duration-500 ease-in-out ${
              isAttempted ? "opacity-0" : "opacity-100"
            }`}
            style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))" }}
          />
          <img
            src={finalImageSrc}
            width={48}
            height={48}
            alt={finalImageAlt}
            className={`absolute transition-opacity duration-500 ease-in-out ${
              isAttempted ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.4))" }}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
            {isAttempted ? "Your Move" : "You Played"}
          </span>
          <span className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white truncate">
            {isAttempted ? playedMove : (puzzle.userMove?.san ?? "--")}
          </span>
          <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide mt-3">
            {isAttempted ? "Best Move" : "Find a better move"}
          </span>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
            {isAttempted ? bestMove : "\u00A0"}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md mt-4">
        <Navigation />
      </div>
    </div>
  );
};

export default PuzzleInfo;
