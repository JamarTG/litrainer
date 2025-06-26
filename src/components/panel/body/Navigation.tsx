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

import { getEngineState } from "@/redux/slices/engine";
import { ICON_SIZES } from "@/constants/icons";

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
        ? " dark:bg-transparent text-gray-400 dark:text-zinc-600 cursor-not-allowed"
        : "hover:bg-zinc-200/75 dark:hover:bg-zinc-700 active:scale-95"
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
            ? " dark:bg-transparent text-gray-400 dark:text-zinc-600 cursor-not-allowed"
            : " text-gray-600 dark:text-gray-300 dark:hover:bg-zinc-700 hover:bg-gray-200 active:scale-95"
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
        ? "dark:bg-transparent text-gray-400 dark:text-zinc-600 cursor-not-allowed"
        : "hover:bg-zinc-200/75 dark:hover:bg-zinc-700 active:scale-95"
    }`}
      >
        <StepForward size={ICON_SIZES.MEDIUM} />
      </button>
    </div>
  );
};

export default PuzzleNavigation;
