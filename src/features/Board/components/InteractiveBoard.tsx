import React, { useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { Materials } from "../../../types/eval";
import { getCustomSquareStyles } from "../../../utils/style";
import { Chessboard } from "react-chessboard";
import PlayerWithMaterial from "./PlayerWithMaterial";
import ResizeHandle from "./ResizeHandle";
import Marker from "./Marker";
import { Classification } from "../../../types/move";
import { Puzzle } from "../../../types/puzzle";
import useResizableBoard from "../hooks/useResizableBoard";
import { BOARD_DIMENSIONS, INITIAL_MATERIAL } from "../../../constants";
import { useMarkerPositionEffect } from "../hooks/useMarkerPositionEffect";
import { useMaterialEffect } from "../hooks/useMaterialEffect";

interface BoardComponentProps {
  game: Chess;
  puzzle: Puzzle | null;
  destinationSquare: Move["to"] | "";
  sourceSquare: Move["from"] | "";
  classification: Classification | "";
  moveSquares: Record<string, string>;
  isLoadingEvaluation: boolean;
  solved: boolean | null;
  fen: string;
  handleSquareClick: (srcSquare: Square) => void;
  makeMove: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: React.FC<BoardComponentProps> = ({
  game,
  puzzle,
  destinationSquare,
  sourceSquare,
  classification,
  moveSquares,
  isLoadingEvaluation,
  solved,

  fen,
  handleSquareClick,
  makeMove,
  unhighlightLegalMoves,
}) => {
  const [markerPosition, setMarkerPosition] = useState<{
    right: number;
    top: number;
  }>({ right: 0, top: 0 });

  const [material, setMaterial] = useState<Materials>(INITIAL_MATERIAL);

  useMaterialEffect(game, setMaterial);

  const { boardSize, boardRef, resizeRef, handleMouseDown } = useResizableBoard(
    BOARD_DIMENSIONS.INITIAL_SIZE,
    BOARD_DIMENSIONS.MIN_SIZE,
    BOARD_DIMENSIONS.MAX_SIZE
  );

  useMarkerPositionEffect(
    destinationSquare,
    boardSize,
    puzzle?.userMove.color as "w" | "b",
    setMarkerPosition
  );
  return (
    <div
      ref={boardRef}
      className="relative flex flex-col justify-center items-center gap-2"
      style={{ maxWidth: boardSize, maxHeight: boardSize }}
    >
      <PlayerWithMaterial puzzle={puzzle} color={"black"} material={material} />

      <Chessboard
        position={fen}
        onSquareClick={handleSquareClick}
        animationDuration={10}
        onPieceDrop={makeMove}
        onPieceDragBegin={unhighlightLegalMoves}
        onPieceDragEnd={unhighlightLegalMoves}
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
