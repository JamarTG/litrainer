import { useState, useMemo, FC } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Materials } from "../../../types/eval";
import Marker from "./MoveClassificationMarker";
import BoardPlayerInfo from "../header/BoardPlayerInfo";
import { useMaterialEffect } from "../../../hooks/useMaterialEffect";
import { initialPieceCounts } from "../../../constants/piece";
import CustomPieces from "./CustomPieces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCustomSquareStyles } from "../helpers/squareStyles";
import { calculateBoardSize } from "../../../utils/chess/board";
import useThrottledResize from "../../../hooks/useThrottledResize";

interface BoardComponentProps {
  game: Chess;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({ game, handleSquareClick, handleMoveAttempt, unhighlightLegalMoves }) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);
  const { fen, moveSquares, destinationSquare, sourceSquare, isLoading } = useSelector((state: RootState) => state.board);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  const { classification, isPuzzleSolved } = useSelector((state: RootState) => state.feedback);
  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);

  useMaterialEffect(game, setMaterial);

  const customSquareStyles = useMemo(
    () => getCustomSquareStyles(destinationSquare as Square, sourceSquare as Square, classification, moveSquares, isLoading),
    [destinationSquare, sourceSquare, classification, moveSquares, isLoading]
  );

  const customPieces = useMemo(() => CustomPieces(pieceSet), [pieceSet]);
  const boardSize = useThrottledResize(() => calculateBoardSize(window.innerWidth, window.innerHeight), 200);
  console.log("Rendered");

  return (
    <BoardPlayerInfo material={material}>
      <div className="relative flex flex-col justify-center items-center gap-2">
        <Chessboard
          position={fen}
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

        <Marker boardSize={boardSize} />
      </div>
    </BoardPlayerInfo>
  );
};

export default InteractiveChessBoard;
