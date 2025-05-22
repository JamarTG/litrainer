import { useState, useMemo, FC } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Materials } from "../../../types/eval";
import Marker from "./MoveClassificationMarker";
import useResponsiveBoardSize from "../../../hooks/useResponsiveBoardSize";
import BoardPlayerInfo from "../header/BoardPlayerInfo";
import { useMaterialEffect } from "../../../hooks/useMaterialEffect";
import { initialPieceCounts } from "../../../constants/piece";
import useDraggableResizer from "../../../hooks/useDraggableResizer";
import CustomPieces from "./CustomPieces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCustomSquareStyles } from "../helpers/squareStyles";
import { getBoardBackgroundStyle } from "../../../utils/chess/board";

interface BoardComponentProps {
  game: Chess;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({ game, handleSquareClick, handleMoveAttempt, unhighlightLegalMoves }) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const fen = useSelector((state: RootState) => state.board.fen);

  const { boardSize, setBoardSize } = useResponsiveBoardSize();
  const { boardRef } = useDraggableResizer(setBoardSize);

  useMaterialEffect(game, setMaterial);

  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const classification = useSelector((state: RootState) => state.feedback.classification);
  const moveSquares = useSelector((state: RootState) => state.board.moveSquares);

  const { destinationSquare, sourceSquare } = useSelector((state: RootState) => state.board);
  const isLoading = useSelector((state: RootState) => state.board.isLoading);
  const customSquareStyles = getCustomSquareStyles(
    destinationSquare as Square,
    sourceSquare as Square,
    classification,
    moveSquares,
    isLoading
  );

  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);
  const customPieces = useMemo(() => {
    return CustomPieces(pieceSet);
  }, [pieceSet]);

  const boardTheme = useSelector((state: RootState) => state.boardTheme.board);
  const boardBackgroundStyle = useMemo(() => {
    const style = getBoardBackgroundStyle(boardTheme);
    // Ensure all properties are defined and fallback to empty string if not
    return {
      backgroundImage: style.backgroundImage ?? "",
      backgroundSize: style.backgroundSize ?? "",
      backgroundPosition: style.backgroundPosition ?? "",
    };
  }, [boardTheme]);

  return (
    <BoardPlayerInfo material={material}>
      <div
        ref={boardRef}
        className="relative flex flex-col justify-center items-center gap-2"
        style={{ maxWidth: boardSize, maxHeight: boardSize }}
      >
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
