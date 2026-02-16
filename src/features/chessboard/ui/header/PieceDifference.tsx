import { PieceCount } from "@/typing/types";
import React from "react";
import PieceNTimes from "./PieceCount";

interface PieceDifferenceProps {
  pieceCounts: PieceCount[];
}

const PieceDifference: React.FC<PieceDifferenceProps> = ({ pieceCounts }) => {
  return (
    <React.Fragment>
      {pieceCounts.map((piece, index) => (
        <div key={index}>
          <PieceNTimes piece={piece} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default PieceDifference;
