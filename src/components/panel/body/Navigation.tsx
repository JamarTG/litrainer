import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  isFirstPuzzle as onFirstPuzzle,
  isLastPuzzle as onLastPuzzle,
  nextPuzzle,
  prevPuzzle,
  redoPuzzle
} from "@/redux/slices/puzzle";
import { hasAttempted, resetFeedback } from "@/redux/slices/feedback";
import { StepForward, StepBack, RotateCcw } from "lucide-react";
import { ICON_SIZES } from "@/constants/ui";
import { getEngineState } from "@/redux/slices/engine";

const PuzzleNavigation = () => {
  const dispatch = useAppDispatch();

  const isEngineRunning = useSelector(getEngineState);

  const isFirstPuzzle = useSelector(onFirstPuzzle);
  const isLastPuzzle = useSelector(onLastPuzzle);
  const attemptedPuzzle = useSelector(hasAttempted);

  const handlePrev = () => {
    if (isFirstPuzzle) return;
    dispatch(resetFeedback());
    dispatch(prevPuzzle());
  };

  const handleNext = () => {
    if (isLastPuzzle) return;
    dispatch(resetFeedback());
    dispatch(nextPuzzle());
  };

  const handleRedo = () => {
    if (!attemptedPuzzle) return;
    dispatch(resetFeedback());
    dispatch(redoPuzzle());
  };

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4">
      <button
        aria-label="Previous Puzzle"
        onClick={handlePrev}
        disabled={isFirstPuzzle || isEngineRunning}
        className={`p-2 rounded-xl transition-all duration-200
    ${
      isFirstPuzzle || isEngineRunning
        ? "text-gray-300 dark:text-zinc-600 cursor-not-allowed"
        : "hover:bg-gray-100 dark:hover:bg-zinc-700 active:scale-95"
    }`}
      >
        <StepBack size={ICON_SIZES.MEDIUM} />
      </button>

      <button
        aria-label="Redo Current Puzzle"
        onClick={handleRedo}
        disabled={!attemptedPuzzle}
        className={`p-2 rounded-xl transition-all duration-200 ${
          !attemptedPuzzle
            ? "bg-gray-50 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 cursor-not-allowed"
            : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
        }`}
      >
        <RotateCcw size={ICON_SIZES.MEDIUM} />
      </button>

      <button
        aria-label="Next Puzzle"
        onClick={handleNext}
        disabled={isLastPuzzle || isEngineRunning}
        className={`p-2 rounded-xl transition-all duration-200
    ${
      isLastPuzzle || isEngineRunning
        ? "text-gray-300 dark:text-zinc-600 cursor-not-allowed"
        : "hover:bg-gray-100 dark:hover:bg-zinc-700 active:scale-95"
    }`}
      >
        <StepForward size={ICON_SIZES.MEDIUM} />
      </button>
    </div>
  );
};

export default PuzzleNavigation;
