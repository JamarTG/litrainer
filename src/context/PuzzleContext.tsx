import { createContext, useState, ReactNode } from "react";
import { Puzzle } from "../types/puzzle";

export interface PuzzleContextType {
  puzzle: Puzzle | null;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
}

export const PuzzleContext = createContext<PuzzleContextType>(
  {} as PuzzleContextType
);

export const PuzzleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  return (
    <PuzzleContext.Provider value={{ puzzle, setPuzzle }}>
      {children}
    </PuzzleContext.Provider>
  );
};
