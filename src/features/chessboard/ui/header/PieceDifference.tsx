import { PieceCount } from "@/typing/types";
import React from "react";
import PieceNTimes from "./PieceCount";

interface PieceDifferenceProps {
  pieceCounts: PieceCount[];
}

const PieceDifference: React.FC<PieceDifferenceProps> = ({ pieceCounts }) => {
  return (
    <div className="flex items-center">
      {pieceCounts.map(([pieceType, count], index) =>
        count > 0 ? (
          <div key={index}>
            <PieceNTimes piece={[pieceType, count]} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default PieceDifference;
