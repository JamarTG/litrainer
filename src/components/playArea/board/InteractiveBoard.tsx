import { useState, useMemo, FC, useEffect} from "react";
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
// import { getBoardBackgroundStyle } from "../../../utils/chess/board";

interface BoardComponentProps {
  game: Chess;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({
  game,
  handleSquareClick,
  handleMoveAttempt,
  unhighlightLegalMoves,
}) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);
  const [boardSize, setBoardSize] = useState(() =>
    calculateBoardSize(window.innerWidth, window.innerHeight)
  );

  const {
    puzzle,
    fen,
    moveSquares,
    destinationSquare,
    isPuzzleSolved,
    isLoading,
    classification,
    sourceSquare,
    pieceSet,
  } = useSelector((state: RootState) => ({
    puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
    fen: state.board.fen,
    moveSquares: state.board.moveSquares,
    isPuzzleSolved: state.feedback.isPuzzleSolved,
    classification: state.feedback.classification,
    destinationSquare: state.board.destinationSquare,
    sourceSquare: state.board.sourceSquare,
    isLoading: state.board.isLoading,
    pieceSet: state.pieceSet.set,
  }));

  useMaterialEffect(game, setMaterial);

  const customSquareStyles = getCustomSquareStyles(
    destinationSquare as Square,
    sourceSquare as Square,
    classification,
    moveSquares,
    isLoading
  );

  const customPieces = useMemo(() => CustomPieces(pieceSet), [pieceSet]);

  useEffect(() => {
    const updateSize = () => {
      setBoardSize(calculateBoardSize(window.innerWidth, window.innerHeight));
    };

    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

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