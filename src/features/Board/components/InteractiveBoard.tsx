import React from "react";
import { Move, Square } from "chess.js";
import { Materials } from "../../../types/eval";
import { getCustomSquareStyles } from "../../../utils/style";
import { Chessboard } from "react-chessboard";
import PlayerWithMaterial from "./PlayerWithMaterial";
import ResizeHandle from "./ResizeHandle";
import Marker from "./Marker";
import { Classification } from "../../../types/move";
import { Puzzle } from "../../../types/puzzle";

interface BoardComponentProps {
  boardRef: React.RefObject<HTMLDivElement>;
  boardSize: number;
  puzzle: Puzzle | null;
  markerPosition: { right: number; top: number };
  destinationSquare: Move["to"] | "";
  sourceSquare: Move["from"] | "";
  classification: Classification | "";
  moveSquares: Record<string, string>;
  isLoadingEvaluation: boolean;
  solved: boolean | null;
  material: Materials;
  fen: string;
  handleSquareClick: (srcSquare: Square) => void;
  handlePieceDrop: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ) => boolean;
  unhighlightSquares: () => void;
  resizeRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const InteractiveChessBoard: React.FC<BoardComponentProps> = ({
  boardRef,
  boardSize,
  puzzle,
  markerPosition,
  destinationSquare,
  sourceSquare,
  classification,
  moveSquares,
  isLoadingEvaluation,
  solved,
  material,
  fen,
  handleSquareClick,
  handlePieceDrop,
  unhighlightSquares,
  resizeRef,
  handleMouseDown,
}) => {
  return (
    <div
      ref={boardRef}
      className="relative flex flex-col justify-center items-center gap-2"
      style={{  maxWidth: boardSize, maxHeight: boardSize }}
    >
      <PlayerWithMaterial puzzle={puzzle} color={"black"} material={material} />

      <Chessboard
        position={fen}
        onSquareClick={handleSquareClick}
        animationDuration={10}
        onPieceDrop={handlePieceDrop}
        onPieceDragBegin={unhighlightSquares}
        onPieceDragEnd={unhighlightSquares}
        boardOrientation={puzzle?.userMove.color == "w" ? "white" : "black"}
        boardWidth={boardSize}
        customSquareStyles={getCustomSquareStyles(
          destinationSquare,
          sourceSquare,
          classification,
          moveSquares,
          isLoadingEvaluation
        )}
        customLightSquareStyle={{ backgroundColor: "#277F71" }}
        customDarkSquareStyle={{ backgroundColor: "#FAFAFA" }}
        arePiecesDraggable={!solved}
      />
      <PlayerWithMaterial puzzle={puzzle} color={"white"} material={material} />
      <Marker
        classification={classification}
        markerPosition={markerPosition}
        boardSize={boardSize}
        destinationSquare={destinationSquare}
      />
      <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
    </div>
  );
};

export default InteractiveChessBoard;
