import { RefObject } from "react";
import { Chess } from "chess.js";
import Chessground from "react-chessground";
import ClassificationMarker from "./overlay/ClassificationMarker";
import PromotionModal, { PromotionMoveObject } from "./overlay/PromotionDialog";
import { ColorLongForm } from "@/typing/enums";
import { turnColor } from "@/utils/board";
import { BOARD_CONFIG } from "@/constants/board";

interface BoardContentProps {
  boardRef: RefObject<HTMLDivElement>;
  fen: string;
  playerColorLongForm: ColorLongForm;
  game: Chess;
  movable: {
    free: boolean;
    dests: Map<string, string[]>;
    color: ColorLongForm;
  };
  onMove: (from: string, to: string) => void;
  promotionMoveObject: PromotionMoveObject | null;
  handlePromotion: (promotionPiece: string) => void;
  handlePromotionCancel: VoidFunction;
}

const BoardContent = ({
  boardRef,
  fen,
  playerColorLongForm,
  game,
  movable,
  onMove,
  promotionMoveObject,
  handlePromotion,
  handlePromotionCancel
}: BoardContentProps) => {
  return (
    <div ref={boardRef} className="box relative rounded main-board green merida">
      <Chessground
        key={`puzzle-${fen}`}
        fen={fen}
        orientation={playerColorLongForm}
        turnColor={turnColor(game)}
        movable={movable}
        lastMove={BOARD_CONFIG.DEFAULT_LAST_MOVE}
        onMove={onMove}
        drawable={{
          enabled: BOARD_CONFIG.DRAWABLE_ENABLED,
          visible: BOARD_CONFIG.VISIBLE_ENABLED,
          defaultSnapToValidMove: BOARD_CONFIG.DEFAULT_SNAP_TO_VALID_MOVE,
          shapes: [{ orig: "e2", dest: "e4", brush: "green" }]
        }}
        className="relative"
        highlight={{ lastMove: BOARD_CONFIG.HIGHLIGHT_LAST_MOVE, check: BOARD_CONFIG.HIGHLIGHT_LAST_CHECK }}
        addPieceZIndex={BOARD_CONFIG.ADD_PIECE_Z_INDEX}
      />

      <ClassificationMarker boardRef={boardRef} boardSize={boardRef.current?.offsetWidth || BOARD_CONFIG.DEFAULT_BOARD_SIZE} />

      <PromotionModal
        isOpen={!!promotionMoveObject}
        color={promotionMoveObject?.color ?? null}
        onPromote={handlePromotion}
        onCancel={handlePromotionCancel}
      />
    </div>
  );
};

export default BoardContent;