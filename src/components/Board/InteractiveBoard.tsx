import { CSSProperties, useContext, useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Materials } from "../../types/eval";
import { getCustomSquareStyles } from "../../utils/style";
import Marker from "./Marker";
import { Classification } from "../../types/classification";
import useResponsiveBoardSize from "../../hooks/useResponsiveBoardSize";
import BoardWithPlayers from "./BoardWithMaterial";
import { useMaterialEffect } from "../../hooks/useMaterialEffect";
import { PuzzleContext } from "../../context/PuzzleContext";
import { INITIAL_PIECE_COUNTS } from "../../constants/piece";
import { useMemo } from "react";
import useDraggableResizer from "../../hooks/useDraggableResizer";
import { createCustomPieces } from "../../utils/piece";

interface BoardComponentProps {
  game: Chess;
  destinationSquare: Move["to"] | null;
  sourceSquare: Move["from"] | null;
  classification: Classification | null;
  moveSquares: Record<string, CSSProperties>;
  isLoadingEvaluation: boolean;
  solved: boolean | null;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: React.FC<BoardComponentProps> = ({
  game,
  destinationSquare,
  sourceSquare,
  classification,
  moveSquares,
  isLoadingEvaluation,
  solved,
  handleSquareClick,
  handleMoveAttempt,
  unhighlightLegalMoves,
}) => {

  const [material, setMaterial] = useState<Materials>(INITIAL_PIECE_COUNTS);
  const { puzzle } = useContext(PuzzleContext);

  const { boardSize, setBoardSize } = useResponsiveBoardSize();
  const { boardRef } = useDraggableResizer(setBoardSize);
  
  useMaterialEffect(game, setMaterial);
6
  const customSquareStyles = getCustomSquareStyles(destinationSquare, sourceSquare, classification, moveSquares, isLoadingEvaluation);

  const customPieces: Record<string, ({ squareWidth }: { squareWidth: number }) => JSX.Element> = useMemo(createCustomPieces, []);

  return (
    <BoardWithPlayers material={material}>
      <div
        ref={boardRef}
        className="relative flex flex-col justify-center items-center gap-2"
        style={{ maxWidth: boardSize, maxHeight: boardSize }}
      >
        <Chessboard
          position={game.fen()}
          onSquareClick={handleSquareClick}
          onPieceDrop={handleMoveAttempt}
          onPieceDragBegin={unhighlightLegalMoves}
          onPieceDragEnd={unhighlightLegalMoves}
          boardOrientation={puzzle?.userMove.color === "w" ? "white" : "black"}
          boardWidth={boardSize}
          customSquareStyles={customSquareStyles}
          arePiecesDraggable={!solved}
          customPieces={customPieces}
        />

        <Marker
          classification={classification}
          boardSize={boardSize}
          destinationSquare={destinationSquare}
        />
      </div>
    </BoardWithPlayers>
  );
};

export default InteractiveChessBoard;
