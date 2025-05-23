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
// import { getBoardBackgroundStyle } from "../../../utils/chess/board";

interface BoardComponentProps {
  game: Chess;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({ game, handleSquareClick, handleMoveAttempt, unhighlightLegalMoves }) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);

  const { puzzle, fen, moveSquares, destinationSquare, isPuzzleSolved, isLoading, classification, sourceSquare, pieceSet } = useSelector(
    (state: RootState) => {
      return {
        puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
        fen: state.board.fen,
        moveSquares: state.board.moveSquares,
        isPuzzleSolved: state.feedback.isPuzzleSolved,
        classification: state.feedback.classification,
        destinationSquare: state.board.destinationSquare,
        sourceSquare: state.board.sourceSquare,
        isLoading: state.board.isLoading,
        pieceSet: state.pieceSet.set,
      };
    }
  );
  const { boardSize, setBoardSize } = useResponsiveBoardSize();
  const { boardRef } = useDraggableResizer(setBoardSize);

  useMaterialEffect(game, setMaterial);

  const customSquareStyles = getCustomSquareStyles(
    destinationSquare as Square,
    sourceSquare as Square,
    classification,
    moveSquares,
    isLoading
  );
  const customPieces = useMemo(() => {
    return CustomPieces(pieceSet);
  }, [pieceSet]);

  // const boardTheme = useSelector((state: RootState) => state.boardTheme.board);
  // const boardBackgroundStyle = useMemo(() => {
  //   const style = getBoardBackgroundStyle(boardTheme);
  //   // Ensure all properties are defined and fallback to empty string if not
  //   return {
  //     backgroundImage: style.backgroundImage ?? "",
  //     backgroundSize: style.backgroundSize ?? "",
  //     backgroundPosition: style.backgroundPosition ?? "",
  //   };
  // }, [boardTheme]);

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
