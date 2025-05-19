import { CSSProperties, useContext, useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Materials } from "../../types/eval";
import { getCustomSquareStyles } from "../../utils/style";
import Marker from "./Marker";
import useResponsiveBoardSize from "../../hooks/useResponsiveBoardSize";
import BoardWithPlayers from "./BoardWithMaterial";
import { useMaterialEffect } from "../../hooks/useMaterialEffect";
import { PuzzleContext } from "../../context/PuzzleContext";
import { INITIAL_PIECE_COUNTS } from "../../constants/piece";
import { useMemo } from "react";
import useDraggableResizer from "../../hooks/useDraggableResizer";
import { createCustomPieces } from "../../utils/piece";
import { useSelector } from "react-redux";
import { RootState } from "../../pages/redux/store";

interface BoardComponentProps {
  game: Chess;
  destinationSquare: Move["to"] | null;
  sourceSquare: Move["from"] | null;
  moveSquares: Record<string, CSSProperties>;
  isLoadingEvaluation: boolean;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: React.FC<BoardComponentProps> = ({
  game,
  destinationSquare,
  sourceSquare,
  moveSquares,
  isLoadingEvaluation,
  handleSquareClick,
  handleMoveAttempt,
  unhighlightLegalMoves,
}) => {
  const [material, setMaterial] = useState<Materials>(INITIAL_PIECE_COUNTS);
  const { puzzle } = useContext(PuzzleContext);

  const { boardSize, setBoardSize } = useResponsiveBoardSize();
  const { boardRef } = useDraggableResizer(setBoardSize);

  useMaterialEffect(game, setMaterial);

  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const classification = useSelector((state: RootState) => state.feedback.classification);

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
          arePiecesDraggable={!isPuzzleSolved}
          customPieces={customPieces}
        />
        <Marker
          boardSize={boardSize}
          destinationSquare={destinationSquare}
        />
      </div>
    </BoardWithPlayers>
  );
};

export default InteractiveChessBoard;
