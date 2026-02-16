import { useRef } from "react";
import { useSelector } from "react-redux";
import { useMaterialUpdate } from "@/hooks/board/useMaterialUpdate";
import "@/styles/chessground.css";
import { ColorLongForm } from "@/typing/enums";
import { getUserColorLongForm } from "@/state/slices/puzzle";
import { getFen } from "@/state/slices/board";
import { getPuzzleStatus } from "@/state/slices/feedback";
import usePuzzleSetup from "@/hooks/common/usePuzzleSetup";
import { useMoveHandler } from "@/hooks/common/useMoveHandler";
import useLoadBoardTheme from "@/hooks/board/useLoadBoardTheme";
import useLoadSet from "@/hooks/board/useLoadSet";
import BoardHeaderLayout from "@/components/layout/BoardHeaderLayout";
import BoardContent from "./BoardContent";
import { useChessBoardController } from "./hooks/useChessBoardController";

const ChessBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  const fen = useSelector(getFen);
  const playerColorLongForm = useSelector(getUserColorLongForm);
  const puzzleStatus = useSelector(getPuzzleStatus);

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
    <BoardHeaderLayout>
      <BoardContent
        boardRef={boardRef}
        fen={fen}
        playerColorLongForm={playerColorLongForm as ColorLongForm}
        game={game}
        movable={movable}
        onMove={onMove}
        promotionMoveObject={promotionMoveObject}
        handlePromotion={handlePromotion}
        handlePromotionCancel={handlePromotionCancel}
      />
    </BoardHeaderLayout>
  );
};

export default ChessBoard;
