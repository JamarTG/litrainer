import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../pages/redux/store";
import { setClassification, setFeedback, setIsPuzzleSolved } from "../pages/redux/slices/feedbackSlices";
import { setDestinationSquare, setFen, setSourceSquare } from "../pages/redux/slices/boardSlices";

const useChangePuzzle = () => {
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  const puzzles = useSelector((state: RootState) => state.puzzle.puzzles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (puzzles.length === 0) return;

    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    dispatch(setFeedback({ best: null, played: null }));
    dispatch(setFen(puzzles[puzzleIndex].fen.previous));
    dispatch(setDestinationSquare(null));
    dispatch(setSourceSquare(null));
    
  }, [puzzleIndex, puzzles, setFen, setClassification, setIsPuzzleSolved]);
};

export default useChangePuzzle;
