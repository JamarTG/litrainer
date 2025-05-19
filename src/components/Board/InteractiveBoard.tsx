import { CSSProperties, useContext, useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Materials } from "../../types/eval";
import { getCustomSquareStyles } from "../../utils/style";
import Marker from "./Marker";
import { Classification } from "../../types/classification";
import useResizableBoard from "../../hooks/useResizableBoard";
import BoardWithPlayers from "./BoardWithMaterial";
import { useMaterialEffect } from "../../hooks/useMaterialEffect";
import { PuzzleContext } from "../../context/PuzzleContext";
import { INITIAL_PIECE_COUNTS } from "../../constants/piece";
import { useMemo } from "react";

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
  const { boardSize, boardRef } = useResizableBoard();
  const { puzzle } = useContext(PuzzleContext);

  useMaterialEffect(game, setMaterial);

  const customSquareStyles = getCustomSquareStyles(destinationSquare, sourceSquare, classification, moveSquares, isLoadingEvaluation);

  const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

  const customPieces: Record<string, ({ squareWidth }: { squareWidth: number }) => JSX.Element> = useMemo(() => {
    const pieceComponents: Record<string, ({ squareWidth }: { squareWidth: number }) => JSX.Element> = {};
    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/assets/piece-sets/fresca/${piece}.svg)`,
            backgroundSize: "100%",
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

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
