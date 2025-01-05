import { useContext, useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Materials } from "../../types/eval";
import { getColorLongForm, getCustomSquareStyles } from "../../utils/style";
import ResizeHandle from "./ResizeHandle";
import Marker from "./Marker";
import { Classification } from "../../types/move";
import useResizableBoard from "../../hooks/useResizableBoard";
import { BOARD_DIMENSIONS, INITIAL_MATERIAL } from "../../constants";
import BoardWithPlayers from "./BoardWithMaterial";
import { useMaterialEffect } from "../../hooks/useMaterialEffect";
import { useMarkerPositionEffect } from "../../hooks/useMarkerPositionEffect";
import { PuzzleContext } from "../../context/PuzzleContext";

interface BoardComponentProps {
  game: Chess;
  destinationSquare: Move["to"] | "";
  sourceSquare: Move["from"] | "";
  classification: Classification | "";
  moveSquares: Record<string, string>;
  isLoadingEvaluation: boolean;
  solved: boolean | null;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ) => boolean;
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
  const [material, setMaterial] = useState<Materials>(INITIAL_MATERIAL);

  const [markerPosition, setMarkerPosition] = useState<{
    right: number;
    top: number;
  }>({ right: 0, top: 0 });

  

  const { boardSize, boardRef, resizeRef, handleMouseDown } = useResizableBoard(
    BOARD_DIMENSIONS.INITIAL_SIZE,
    BOARD_DIMENSIONS.MIN_SIZE,
    BOARD_DIMENSIONS.MAX_SIZE
  );

  const {puzzle} = useContext(PuzzleContext);

  useMaterialEffect(game, setMaterial);
  useMarkerPositionEffect(
    destinationSquare,
    boardSize,
    puzzle?.userMove.color as "w" | "b",
    setMarkerPosition
  );

  const customSquareStyles = getCustomSquareStyles(
    destinationSquare,
    sourceSquare,
    classification,
    moveSquares,
    isLoadingEvaluation
  );

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
          boardOrientation={getColorLongForm(
            puzzle?.userMove.color as "w" | "b"
          )}
          boardWidth={boardSize}
          customSquareStyles={customSquareStyles}
          customLightSquareStyle={{ backgroundColor: "#FAFAFA" }}
          customDarkSquareStyle={{ backgroundColor: "#277F71" }}
          arePiecesDraggable={!solved}
        />
   
        <Marker
          classification={classification}
          markerPosition={markerPosition}
          boardSize={boardSize}
          destinationSquare={destinationSquare}
        />
        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>
    </BoardWithPlayers>
  );
};

export default InteractiveChessBoard;
