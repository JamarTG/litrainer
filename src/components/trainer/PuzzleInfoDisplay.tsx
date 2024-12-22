import React from "react";
import { Puzzle } from "../../types/puzzle";
import { LineResult } from "../../types/eval";

interface PuzzleInfoDisplayProps {
  currentPuzzle: Puzzle | null;
  acceptableMoves: { move: string; eval: number }[] | null;
}

const PuzzleInfoDisplay: React.FC<PuzzleInfoDisplayProps> = ({
  currentPuzzle,
  acceptableMoves,
}) => {
  return (
    <div
      className="absolute bottom-0 right-0 p-2  bg-opacity-75 text-xs rounded shadow-md"
      style={{ width: "200px" }}
    >
      <div>
        <strong>Severity:</strong>{" "}
        {JSON.stringify(currentPuzzle?.evaluation?.judgment?.name ?? "N/A")}
      </div>
      <div>
        <strong>Acceptable Moves:</strong>{" "}
        {acceptableMoves?.map((move: LineResult) => (
          <div key={move.move}>
            {move.move}: {move.eval > 0 && "+"} {move.eval / 100}
          </div>
        ))}
      </div>
      <div>
        <strong>You played:</strong> {currentPuzzle?.userMove?.san}
      </div>
      <div>
        <strong>Current Puzzle:</strong>{" "}
        {JSON.stringify(currentPuzzle?.fen.current)}
      </div>
    </div>
  );
};

export default PuzzleInfoDisplay;
