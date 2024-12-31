import { createContext } from "react";
import { Puzzle } from "../../types/puzzle";

export interface PuzzleContextType {

  puzzle: Puzzle | null;

  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;

}

export const PuzzleContext = createContext<PuzzleContextType>(
  {} as PuzzleContextType
);
