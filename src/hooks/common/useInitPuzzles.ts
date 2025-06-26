import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPuzzles } from "@/redux/slices/puzzle";
import { Puzzle } from "@/typing/lichess";

const useInitPuzzles = (puzzles: Puzzle[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPuzzles(puzzles));
  }, [puzzles, dispatch]);

  return puzzles;
};

export default useInitPuzzles;
