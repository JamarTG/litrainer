import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { nextPuzzle, prevPuzzle, redoPuzzle } from "@/redux/slices/puzzle";
import { resetFeedback } from "@/redux/slices/feedback";
import { StepForward, StepBack, Redo } from "lucide-react";

const PuzzleNavigation = () => {
  const dispatch = useAppDispatch();

  const handlePrev = () => dispatch(prevPuzzle());
  const handleNext = () => dispatch(nextPuzzle());
  const handleRedo = () => {
    dispatch(resetFeedback());
    dispatch(redoPuzzle());
  };

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4">
      
      <button
        aria-label="Previous Puzzle"
        onClick={handlePrev}
        className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700"
      >
        <StepBack size={25} />
      </button>

      <button
        aria-label="Next Puzzle"
        onClick={handleNext}
        className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700"
      >
        <StepForward size={25} />
      </button>

      <button
        aria-label="Redo Puzzle"
        onClick={handleRedo}
        className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700"
      >
        <Redo size={25} />
      </button>
    </div>
  );
};

export default PuzzleNavigation;
