import { useState, useRef, Fragment } from "react";
import { Square } from "chess.js";
import ChessBoardLayout from "../layout/ChessBoard";
import { useSelector } from "react-redux";
import Chessground from "react-chessground";
import MoveClassificationMarker from "./overlay/ClassificationMarker";
import { useMaterialUpdate } from "@/components/board/hooks/useMaterialUpdate";
import "@/styles/chessground.css";
import PromotionModal, { PromotionData } from "./overlay/PromotionDialog";
import { ColorLongForm } from "@/types/lichess";
import { getPuzzle } from "@/redux/slices/puzzle";
import { getFen } from "@/redux/slices/board";
import { getIsPuzzleSolved } from "@/redux/slices/feedback";
import usePuzzleSetup from "@/hooks/usePuzzleSetup";
import { useMoveHandler } from "@/hooks/useMoveHandler";
import useLoadBoardTheme from "./hooks/useLoadBoardTheme";
import useLoadSet from "./hooks/useLoadSet";
import { isPromotionMove, turnColor } from "./board";
import { getLongColor } from "@/utils/color";

const ChessBoard = () => {
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  const fen = useSelector(getFen);
  const puzzle = useSelector(getPuzzle);
  const isPuzzleSolved = useSelector(getIsPuzzleSolved);

  const { game } = usePuzzleSetup();

  const { handleMoveAttempt } = useMoveHandler(game);

  useMaterialUpdate(game, fen);
  useLoadBoardTheme();
  useLoadSet();

  const playerColorLongForm = getLongColor(puzzle?.userMove.color);
  const calcMovable = (isPuzzleSolved: boolean) => {
    if (isPuzzleSolved) {
      return {
        free: false,
        dests: new Map()
      };
    }

    const dests = new Map();
    const moves = game.moves({ verbose: true });

    moves.forEach((move) => {
      if (!dests.has(move.from)) {
        dests.set(move.from, []);
      }
      dests.get(move.from)!.push(move.to);
    });

    return {
      free: false,
      dests,
      color: playerColorLongForm as ColorLongForm
    };
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
              lastMove={undefined}
              onMove={onMove}
              drawable={{
                enabled: true,
                visible: true,
                defaultSnapToValidMove: true,
                shapes: [{ orig: "e2", dest: "e4", brush: "green" }]
              }}
              highlight={{ lastMove: true, check: true }}
              addPieceZIndex={true}
            />
            <MoveClassificationMarker
              boardRef={boardRef}
              orientation={playerColorLongForm}
              boardSize={boardRef.current?.offsetWidth || 400}
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
