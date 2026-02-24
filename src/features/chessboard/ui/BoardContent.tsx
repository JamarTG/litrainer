import { CSSProperties, ComponentProps, RefObject } from "react";
import { Chess } from "chess.js";
import Chessground from "react-chessground";
import ClassificationMarker from "./overlay/ClassificationMarker";
import PromotionModal, { PromotionMoveObject } from "./overlay/PromotionDialog";
import { ColorLongForm } from "@/typing/enums";
import { turnColor } from "@/utils/board";
import { BOARD_CONFIG } from "@/constants/board";
import { Classification } from "@/typing/types";
import { CLASSIFICATION_COLORS } from "@/constants/classification";

type ChessgroundProps = ComponentProps<typeof Chessground>;
type ChessgroundMovable = NonNullable<ChessgroundProps["movable"]>;
type ChessgroundLastMove = ChessgroundProps["lastMove"];
type ChessgroundOnMove = NonNullable<ChessgroundProps["onMove"]>;

interface BoardContentProps {
  boardRef: RefObject<HTMLDivElement>;
  fen: string;
  playerColorLongForm: ColorLongForm;
  game: Chess;
  classification: Classification | null;
  lastMove?: ChessgroundLastMove;
  movable: ChessgroundMovable;
  onMove: ChessgroundOnMove;
  promotionMoveObject: PromotionMoveObject | null;
  handlePromotion: (promotionPiece: string) => void;
  handlePromotionCancel: VoidFunction;
  hidePieces?: boolean;
}

const BoardContent = ({
  boardRef,
  fen,
  playerColorLongForm,
  game,
  classification,
  lastMove,
  movable,
  onMove,
  promotionMoveObject,
  handlePromotion,
  handlePromotionCancel,
  hidePieces = false
}: BoardContentProps) => {
  const convertHexToRgba = (hexColor: string, alpha: number) => {
    const sanitized = hexColor.replace("#", "");
    const fullHex = sanitized.length === 3 ? sanitized.split("").map((char) => `${char}${char}`).join("") : sanitized;

    const red = parseInt(fullHex.slice(0, 2), 16);
    const green = parseInt(fullHex.slice(2, 4), 16);
    const blue = parseInt(fullHex.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  };

  const classificationColor = classification ? CLASSIFICATION_COLORS[classification] : null;
  const lastMoveHighlightColor = classificationColor
    ? convertHexToRgba(classificationColor, 0.42)
    : "rgba(155, 199, 0, 0.41)";

  const boardStyle = {
    "--last-move-highlight": lastMoveHighlightColor
  } as CSSProperties;

  return (
    <div ref={boardRef} style={boardStyle} className="box relative main-board green merida">
      <Chessground
        key={`puzzle-${fen}`}
        fen={hidePieces ? '8/8/8/8/8/8/8/8' : fen}
        orientation={playerColorLongForm}
        turnColor={turnColor(game)}
        movable={hidePieces ? ({ free: false, color: undefined, dests: new Map() } as ChessgroundMovable) : movable}
        lastMove={hidePieces ? undefined : (lastMove as ChessgroundLastMove)}
        onMove={hidePieces ? undefined : onMove}
        drawable={hidePieces ? { enabled: false, visible: false, shapes: [] } : {
          enabled: BOARD_CONFIG.DRAWABLE_ENABLED,
          visible: BOARD_CONFIG.VISIBLE_ENABLED,
          defaultSnapToValidMove: BOARD_CONFIG.DEFAULT_SNAP_TO_VALID_MOVE,
          shapes: [{ orig: "e2", dest: "e4", brush: "green" }]
        }}
        className="relative"
        highlight={hidePieces ? { lastMove: false, check: false } : { lastMove: BOARD_CONFIG.HIGHLIGHT_LAST_MOVE, check: BOARD_CONFIG.HIGHLIGHT_LAST_CHECK }}
        addPieceZIndex={BOARD_CONFIG.ADD_PIECE_Z_INDEX}
      />
      {!hidePieces && (
        <>
          <ClassificationMarker boardRef={boardRef} boardSize={boardRef.current?.offsetWidth || BOARD_CONFIG.DEFAULT_BOARD_SIZE} />
          <PromotionModal
            isOpen={!!promotionMoveObject}
            color={promotionMoveObject?.color ?? null}
            onPromote={handlePromotion}
            onCancel={handlePromotionCancel}
          />
        </>
      )}
    </div>
  );
};

export default BoardContent;