import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPuzzles } from "../pages/redux/slices/puzzleSlices";
import { Puzzle } from "../types/puzzle";

const useInitPuzzles = (puzzles: Puzzle[]) => {

  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(setPuzzles(puzzles));
    }, [puzzles]);
};

export default useInitPuzzles;
