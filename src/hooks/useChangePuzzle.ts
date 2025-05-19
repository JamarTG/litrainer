import { useEffect, Dispatch, SetStateAction } from "react";
import { Square } from "chess.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../pages/redux/store";
import { setClassification, setFeedback, setIsPuzzleSolved } from "../pages/redux/slices/feedbackSlices";

const useChangePuzzle = (
  setDstSquare: Dispatch<SetStateAction<Square | null>>,
  setSrcSquare: Dispatch<SetStateAction<Square | null>>,
  setFen: Dispatch<SetStateAction<string>>,
  // setMoveFeedback: Dispatch<SetStateAction<{ best: string | null; played: string | null }>>,
  // setClassification: Dispatch<SetStateAction<Classification | null>>,
  // setIsPuzzleSolved: Dispatch<SetStateAction<boolean | null>>
) => {
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);

  const puzzles = useSelector((state: RootState) => state.puzzle.puzzles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (puzzles.length === 0) return;


    dispatch(setClassification(null));
    dispatch(setIsPuzzleSolved(false));
    dispatch(setFeedback({ best: null, played: null }));
    setFen(puzzles[puzzleIndex].fen.previous);
    setDstSquare(null);
    setSrcSquare(null);
  }, [puzzleIndex, puzzles, setFen, setDstSquare, setSrcSquare, setClassification, setIsPuzzleSolved]);
};

export default useChangePuzzle;
