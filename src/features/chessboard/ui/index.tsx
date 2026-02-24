import { useRef } from "react";
import { useSelector } from "react-redux";
import type { ComponentProps } from "react";
import { useMaterialUpdate } from "@/hooks/board/useMaterialUpdate";
import "@/styles/chessground.css";
import { ColorLongForm } from "@/typing/enums";
import { getUserColorLongForm } from "@/state/slices/puzzle";
import { getDestinationSquare, getFen, getSourceSquare } from "@/state/slices/board";
import { getClassification, getPuzzleStatus } from "@/state/slices/feedback";
import usePuzzleSetup from "@/hooks/common/usePuzzleSetup";
import { useMoveHandler } from "@/hooks/common/useMoveHandler";
import useLoadBoardTheme from "@/hooks/board/useLoadBoardTheme";
import useLoadSet from "@/hooks/board/useLoadSet";
import BoardHeaderLayout from "@/components/layout/BoardHeaderLayout";
import BoardContent from "./BoardContent";
import { useChessBoardController } from "./hooks/useChessBoardController";
import Chessground from "react-chessground";

type ChessgroundLastMove = ComponentProps<typeof Chessground>["lastMove"];

const ChessBoard = ({ hidePieces = false }: { hidePieces?: boolean }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const fen = useSelector(getFen);
  const sourceSquare = useSelector(getSourceSquare);
  const destinationSquare = useSelector(getDestinationSquare);
  const playerColorLongForm = useSelector(getUserColorLongForm);
  const puzzleStatus = useSelector(getPuzzleStatus);
  const classification = useSelector(getClassification);

  const lastMove: ChessgroundLastMove =
    sourceSquare && destinationSquare ? ([sourceSquare, destinationSquare] as ChessgroundLastMove) : undefined;

  const { game } = usePuzzleSetup();
  const { handleMoveAttempt } = useMoveHandler(game);

  useMaterialUpdate(game);
  useLoadBoardTheme();
  useLoadSet();

  const { movable, onMove, promotionMoveObject, handlePromotion, handlePromotionCancel } = useChessBoardController({
    game,
    playerColorLongForm: playerColorLongForm as ColorLongForm,
    puzzleStatus,
    handleMoveAttempt
  });

  return (
    <BoardHeaderLayout hideHeaders={hidePieces}>
      <BoardContent
        boardRef={boardRef}
        fen={fen}
        playerColorLongForm={playerColorLongForm as ColorLongForm}
        game={game}
        classification={classification}
        lastMove={lastMove}
        movable={movable}
        onMove={onMove}
        promotionMoveObject={promotionMoveObject}
        handlePromotion={handlePromotion}
        handlePromotionCancel={handlePromotionCancel}
        hidePieces={hidePieces}
      />
    </BoardHeaderLayout>
  );
};

export default ChessBoard;
