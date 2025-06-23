import { useState, useRef, Fragment } from "react";
import { Square } from "chess.js";
import ChessBoardLayout from "../layout/ChessBoard";
import { useSelector } from "react-redux";
import Chessground from "react-chessground";
import ClassificationMarker from "./overlay/ClassificationMarker";
import { useMaterialUpdate } from "@/components/board/hooks/useMaterialUpdate";
import "@/styles/chessground.css";
import PromotionModal, { PromotionData } from "./overlay/PromotionDialog";
import { ColorLongForm } from "@/types/lichess";
import { getUserColorLongForm } from "@/redux/slices/puzzle";
import { getFen } from "@/redux/slices/board";
import { getIsPuzzleSolved } from "@/redux/slices/feedback";
import usePuzzleSetup from "@/hooks/usePuzzleSetup";
import { useMoveHandler } from "@/hooks/useMoveHandler";
import useLoadBoardTheme from "./hooks/useLoadBoardTheme";
import useLoadSet from "./hooks/useLoadSet";
import { isPromotionMove, turnColor } from "./board";
import { getLongColor } from "@/utils/color";
import { BOARD_CONFIG } from "@/constants/board";
import { buildDestsMap, createMovableConfig, DEFAULT_MOVABLE_CONFIG } from "./chess-board";

const ChessBoard = () => {
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const fen = useSelector(getFen);
  const playerColorLongForm = useSelector(getUserColorLongForm);
  const isPuzzleSolved = useSelector(getIsPuzzleSolved);

  const { game } = usePuzzleSetup();
  const { handleMoveAttempt } = useMoveHandler(game);

  useMaterialUpdate(game);
  useLoadBoardTheme();
  useLoadSet();

  const calcMovable = (isPuzzleSolved: boolean) => {
    if (isPuzzleSolved) return DEFAULT_MOVABLE_CONFIG;

    const moves = game.moves({ verbose: true });
    const dests = buildDestsMap(moves);

    return createMovableConfig(dests, playerColorLongForm as ColorLongForm);
  };

  const onMove = (from: string, to: string) => {
    const fromSquare = from as Square;
    const toSquare = to as Square;

    if (isPromotionMove(game, fromSquare, toSquare)) {
      const movingPiece = game.get(fromSquare);
      const color = getLongColor(movingPiece?.color);

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
    <Fragment>
      <ChessBoardLayout>
        <div className="box relative rounded-">
          <div className="main-board green merida my-2 " ref={boardRef}>
            <Chessground
              key={`puzzle-${fen}`}
              fen={fen}
              orientation={playerColorLongForm}
              turnColor={turnColor(game)}
              movable={calcMovable(isPuzzleSolved)}
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
          </div>
        </div>
      </ChessBoardLayout>

      <PromotionModal
        isOpen={!!promotionData}
        promotionData={promotionData}
        onPromote={handlePromotion}
        onCancel={handlePromotionCancel}
      />
    </Fragment>
  );
};

export default ChessBoard;
