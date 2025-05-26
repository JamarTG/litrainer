import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { resetFeedback } from "../redux/slices/feedback";
import { resetBoardState } from "../redux/slices/board";

const useChangePuzzle = () => {
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  const puzzles = useSelector((state: RootState) => state.puzzle.puzzles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (puzzles.length === 0) return;

    dispatch(resetBoardState());
    dispatch(resetFeedback());
  }, [puzzleIndex, puzzles, dispatch]);
};

export default useChangePuzzle;
