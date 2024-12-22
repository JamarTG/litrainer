import React from "react";
import { Puzzle } from "../../types/puzzle";
import { LineResult } from "../../types/eval";

interface PuzzleInfoDisplayProps {
  puzzle: Puzzle | null;
  bestMoves: { move: string; eval: number }[] | null;
}

const MoveAnalysisPanel: React.FC<PuzzleInfoDisplayProps> = ({
  puzzle,
  bestMoves,
}) => {
  return (
    <div
      className="absolute bottom-0 right-0 p-2  bg-opacity-75 text-xs rounded shadow-md"
      style={{ width: "200px" }}
    >
      <div>
        <strong>Severity:</strong>{" "}
        {JSON.stringify(puzzle?.evaluation?.judgment?.name ?? "N/A")}
      </div>
      <div>
        <strong>Acceptable Moves:</strong>{" "}
        {bestMoves?.map((move: LineResult) => (
          <div key={move.move}>
            {move.move}: {move.eval > 0 && "+"} {move.eval / 100}
          </div>
        ))}
      </div>
      <div>
        <strong>You played:</strong> {puzzle?.userMove?.san}
      </div>
      <div>
        <strong>Current Puzzle:</strong>{" "}
        {JSON.stringify(puzzle?.fen.current)}
      </div>
    </div>
  );
};

export default MoveAnalysisPanel;
