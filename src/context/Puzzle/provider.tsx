import { ReactNode, useState } from "react";
import { PuzzleContext } from "./context";
import { Puzzle } from "../../types/puzzle";

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
