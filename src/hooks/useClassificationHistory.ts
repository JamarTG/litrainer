import { SetStateAction, useEffect, Dispatch } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../pages/redux/store";

type History = Record<number, string | null>;

const useClassificationHistory = (history: History, setHistory: Dispatch<SetStateAction<History>>) => {
  const puzzleIndex = useSelector((state: RootState) => state.puzzle.currentIndex);
  const classification = useSelector((state: RootState) => state.feedback.classification);

  useEffect(() => {
    if (history[puzzleIndex] && classification === null) return;
    setHistory({ ...history, [puzzleIndex]: classification });
  }, [classification, puzzleIndex]);
};

export default useClassificationHistory;
