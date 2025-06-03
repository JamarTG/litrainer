import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { nextPuzzle, prevPuzzle, redoPuzzle } from "@/redux/slices/puzzle";
import { resetFeedback } from "@/redux/slices/feedback";
import { StepForward, StepBack, RotateCcw } from "lucide-react";

const PuzzleNavigation = () => {
  const dispatch = useAppDispatch();
  
  const { currentIndex, puzzles } = useSelector((state: RootState) => state.puzzle);
  const { playedMove } = useSelector((state: RootState) => state.feedback);

  const isFirstPuzzle = currentIndex === 0;
  const isLastPuzzle = currentIndex === puzzles.length - 1;
  const hasAttempted = !!playedMove;

  const handlePrev = () => {
    if (!isFirstPuzzle) {
      dispatch(resetFeedback());
      dispatch(prevPuzzle());
    }
  };

  const handleNext = () => {
    if (!isLastPuzzle) {
      dispatch(resetFeedback());
      dispatch(nextPuzzle());
    }
  };

  const handleRedo = () => {
    dispatch(resetFeedback());
    dispatch(redoPuzzle());
  };

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4">
      
      <button
        aria-label="Previous Puzzle"
        onClick={handlePrev}
        disabled={isFirstPuzzle}
        className={`p-2 rounded-xl transition-all duration-200 ${
          isFirstPuzzle
            ? 'bg-gray-50 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700 active:scale-95'
        }`}
      >
        <StepBack size={25} />
      </button>

      <button
        aria-label="Redo Current Puzzle"
        onClick={handleRedo}
        disabled={!hasAttempted}
        className={`p-2 rounded-xl transition-all duration-200 ${
          !hasAttempted
            ? 'bg-gray-50 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
        }`}
      >
        <RotateCcw size={25} />
      </button>

      <button
        aria-label="Next Puzzle"
        onClick={handleNext}
        disabled={isLastPuzzle}
        className={`p-2 rounded-xl transition-all duration-200 ${
          isLastPuzzle
            ? 'bg-gray-50 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700 active:scale-95'
        }`}
      >
        <StepForward size={25} />
      </button>
    </div>
  );
};

export default PuzzleNavigation;