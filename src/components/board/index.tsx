import { useState, useRef } from "react";
import { Square } from "chess.js";
import { useSelector } from "react-redux";
import Chessground from "react-chessground";
import ClassificationMarker from "./overlay/ClassificationMarker";
import { useMaterialUpdate } from "@/hooks/board/useMaterialUpdate";
import "@/styles/chessground.css";
import PromotionModal, { PromotionData } from "./overlay/PromotionDialog";
import { ColorLongForm, ColorShortForm } from "@/typing/enums";
import { getUserColorLongForm } from "@/redux/slices/puzzle";
import { getFen } from "@/redux/slices/board";
import { getPuzzleStatus, PuzzleStatus } from "@/redux/slices/feedback";
import usePuzzleSetup from "@/hooks/common/usePuzzleSetup";
import { useMoveHandler } from "@/hooks/common/useMoveHandler";
import useLoadBoardTheme from "@/hooks/board/useLoadBoardTheme";
import useLoadSet from "@/hooks/board/useLoadSet";
import { isPromotionMove, turnColor } from "./board";
import { buildDestsMap, createMovableConfig, getDefaultMovableConfig } from "./chess-board";
import { DEFAULT_BOARD_SIZE } from "@/constants/board";
import ChessBoardHeaderWrapper from "../layout/ChessBoard";

export const BOARD_CONFIG = {
  DEFAULT_LAST_MOVE: undefined,
  DRAWABLE_ENABLED: true,
  VISIBLE_ENABLED: true,
  DEFAULT_SNAP_TO_VALID_MOVE: true,
  LAST_MOVE: true,
  HIGHLIGHT_LAST_MOVE: true,
  HIGHLIGHT_LAST_CHECK: true,
  ADD_PIECE_Z_INDEX: true,
  DEFAULT_BOARD_SIZE: DEFAULT_BOARD_SIZE,
  MOVABLE_SOLVED: {
    free: false,
    dests: new Map()
  }
};

const ChessBoard = () => {
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const fen = useSelector(getFen);
  const playerColorLongForm = useSelector(getUserColorLongForm);
  const puzzleStatus = useSelector(getPuzzleStatus);

  const { game } = usePuzzleSetup();
  const { handleMoveAttempt } = useMoveHandler(game);

  useMaterialUpdate(game);
  useLoadBoardTheme();
  useLoadSet();

  const calcMovable = (puzzleStatus: PuzzleStatus) => {
    if (puzzleStatus === "solved") return getDefaultMovableConfig();

    const moves = game.moves({ verbose: true });
    const dests = buildDestsMap(moves);

    return createMovableConfig(dests, playerColorLongForm as ColorLongForm);
  };

  const onMove = (from: string, to: string) => {
    const fromSquare = from as Square;
    const toSquare = to as Square;

    if (isPromotionMove(game, fromSquare, toSquare)) {
      const movingPiece = game.get(fromSquare);
      const color = movingPiece?.color === ColorShortForm.WHITE ? ColorLongForm.WHITE : ColorLongForm.BLACK;

      setPromotionData({
        from: fromSquare,
        to: toSquare,
        color
      });
      return;
    }

    handleMoveAttempt(fromSquare, toSquare, "");
  };

  const handlePromotion = (promotionPiece: string) => {
    if (!promotionData) return;

    const { from, to } = promotionData;
    handleMoveAttempt(from, to, promotionPiece);
    setPromotionData(null);
  };

  const handlePromotionCancel = () => {
    setPromotionData(null);
  };

  return (
    <ChessBoardHeaderWrapper>
      <div className="box relative rounded main-board green merida my-2 " ref={boardRef}>
        <Chessground
          key={`puzzle-${fen}`}
          fen={fen}
          orientation={playerColorLongForm}
          turnColor={turnColor(game)}
          movable={calcMovable(puzzleStatus)}
          lastMove={BOARD_CONFIG.DEFAULT_LAST_MOVE}
          onMove={onMove}
          drawable={{
            enabled: BOARD_CONFIG.DRAWABLE_ENABLED,
            visible: BOARD_CONFIG.VISIBLE_ENABLED,
            defaultSnapToValidMove: BOARD_CONFIG.DEFAULT_SNAP_TO_VALID_MOVE,
            shapes: [{ orig: "e2", dest: "e4", brush: "green" }]
          }}
          highlight={{ lastMove: BOARD_CONFIG.HIGHLIGHT_LAST_MOVE, check: BOARD_CONFIG.HIGHLIGHT_LAST_CHECK }}
          addPieceZIndex={BOARD_CONFIG.ADD_PIECE_Z_INDEX}
        />

        <ClassificationMarker
          boardRef={boardRef}
          boardSize={boardRef.current?.offsetWidth || BOARD_CONFIG.DEFAULT_BOARD_SIZE}
        />

        <PromotionModal
          isOpen={!!promotionData}
          promotionData={promotionData}
          onPromote={handlePromotion}
          onCancel={handlePromotionCancel}
        />
      </div>
    </ChessBoardHeaderWrapper>
  );
};

export default ChessBoard;
