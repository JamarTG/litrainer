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

import { getEngineState } from "@/redux/slices/engine";
import { ICON_SIZES } from "@/constants/icons";
import next from "/icons/next.svg";
import prev from "/icons/prev.svg";
import retry from "/icons/retry.svg";



const baseBtn =
  "flex items-center justify-center px-5 py-1 rounded-lg font-semibold transition-all duration-150 active:translate-y-1 gap-2 shadow-md " +
  "bg-stone-100 border-stone-500 text-stone-700 dark:border-stone-400 dark:text-stone-300 " +
  "disabled:border-stone-400 disabled:text-stone-400 disabled:cursor-not-allowed disabled:shadow-none dark:disabled:border-stone-600 dark:disabled:text-stone-600";

const NavigatePuzzle = () => {
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
        className={baseBtn}
      >
        <img src={prev} width={ICON_SIZES.LARGE} />
      </button>

      <button
        aria-label="Redo Current Puzzle"
        onClick={handleRedo}
        disabled={!attemptedPuzzle}
        className={baseBtn}
      >
        <img src={retry} width={ICON_SIZES.LARGE} />
      </button>

      <button
        aria-label="Next Puzzle"
        onClick={handleNext}
        disabled={isLastPuzzle || isEngineRunning}
        className={baseBtn}
      >
        <img src={next} width={ICON_SIZES.LARGE} />
      </button>
    </div>
  );
};

export default NavigatePuzzle;
