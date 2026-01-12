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
import { RefreshCcw, SkipBack, SkipForward } from "lucide-react";

import { getEngineState } from "@/redux/slices/engine";
import { ICON_SIZES } from "@/constants/icons";
import Button from "@/components/shared/Button";

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
      <Button aria-label="Previous Puzzle" onClick={handlePrev} disabled={isFirstPuzzle || isEngineRunning} border>
        <SkipBack size={ICON_SIZES.SMALL} /> PREVIOUS
      </Button>

      <Button aria-label="Redo Current Puzzle" onClick={handleRedo} disabled={!attemptedPuzzle} border>
        <RefreshCcw size={ICON_SIZES.SMALL} /> RETRY
      </Button>

      <Button aria-label="Next Puzzle" onClick={handleNext} disabled={isLastPuzzle || isEngineRunning} border>
        <SkipForward size={ICON_SIZES.SMALL} /> NEXT
      </Button>
    </div>
  );
};

export default NavigatePuzzle;
