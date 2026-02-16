import { useAppDispatch } from "@/state/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  isFirstPuzzle as onFirstPuzzle,
  isLastPuzzle as onLastPuzzle,
  nextPuzzle,
  prevPuzzle,
  redoPuzzle
} from "@/state/slices/puzzle";
import { getPuzzleStatus, resetFeedback } from "@/state/slices/feedback";

import { getEngineState } from "@/state/slices/engine";
import { ICON_SIZES } from "@/constants/icons";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Button from "@/components/shared/Button";

const navBtnClass = "w-16 h-8 px-0 py-0 shadow-sm";

const NavigatePuzzle = () => {
  const dispatch = useAppDispatch();

  const isEngineRunning = useSelector(getEngineState);
  const isFirstPuzzle = useSelector(onFirstPuzzle);
  const isLastPuzzle = useSelector(onLastPuzzle);
  const puzzleStatus = useSelector(getPuzzleStatus);

  // Animate next button color when puzzle is solved
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [animateNext, setAnimateNext] = useState(false);
  const lastStatus = useRef<string | null>(null);
  useEffect(() => {
    if (puzzleStatus === "solved" && lastStatus.current !== "solved") {
      setAnimateNext(true);
      const timeout = setTimeout(() => {
        setAnimateNext(false);
      }, 700);
      lastStatus.current = "solved";
      return () => clearTimeout(timeout);
    }
    if (puzzleStatus !== "solved") {
      lastStatus.current = puzzleStatus;
    }
  }, [puzzleStatus]);

  const canRedoCurrentPuzzle = puzzleStatus !== "unsolved";

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
    if (!canRedoCurrentPuzzle) return;
    dispatch(resetFeedback());
    dispatch(redoPuzzle());
  };

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4">
      <Button
        border
        aria-label="Previous Puzzle"
        onClick={handlePrev}
        disabled={isFirstPuzzle || isEngineRunning}
        className={navBtnClass}
      >
        <ChevronLeft size={ICON_SIZES.LARGE} />
      </Button>

      <Button
        border
        aria-label="Redo Current Puzzle"
        onClick={handleRedo}
        disabled={!canRedoCurrentPuzzle || isEngineRunning}
        className={navBtnClass}
      >
        <RotateCcw size={ICON_SIZES.LARGE} />
      </Button>

      <Button
        border
        aria-label="Next Puzzle"
        onClick={handleNext}
        disabled={isLastPuzzle || isEngineRunning}
        className={
          navBtnClass +
          " transition-colors duration-300" +
          (animateNext ? " next-btn-animate" : "")
        }
        ref={nextBtnRef}
        style={{ transition: 'background-color 0.3s' }}
      >
        <ChevronRight size={ICON_SIZES.LARGE} />
      </Button>
    </div>
  );
};

export default NavigatePuzzle;
