import { useState, useEffect, useRef, Fragment } from "react";
import { Square } from "chess.js";
import ChessBoardLayout from "../layout/ChessBoard";
import { useSelector } from "react-redux";
import Chessground from "react-chessground";
import type { Color } from "chessground/types";
import MoveClassificationMarker from "./overlay/ClassificationMarker";
import { isPieceSetAvailable, loadPieceSetCSS } from "@/utils/theme-loaders/piece-theme-loader";
import { isBoardThemeAvailable, loadBoardThemeCSS } from "@/utils/theme-loaders/board-theme-loader";
import { useMaterialEffect } from "@/components/board/hooks/useMaterialEffect";
import "@/styles/chessground.css";
import PromotionModal, { PromotionData } from "./overlay/PromotionDialog";
import { ColorLongForm } from "@/types/lichess";
import { getPuzzle } from "@/redux/slices/puzzle";
import { getPieceSet } from "@/redux/slices/piece-set";
import { getBoardTheme } from "@/redux/slices/board-style";
import { getFen, getMaterials } from "@/redux/slices/board";
import { getIsPuzzleSolved } from "@/redux/slices/feedback";
import usePuzzleSetup from "@/hooks/usePuzzleSetup";
import { useMoveHandler } from "@/hooks/useMoveHandler";

const ChessBoard = () => {
  const materials = useSelector(getMaterials);
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  const fen = useSelector(getFen);
  const puzzle = useSelector(getPuzzle);
  const isPuzzleSolved = useSelector(getIsPuzzleSolved);
  const pieceSet = useSelector(getPieceSet);
  const boardTheme = useSelector(getBoardTheme);

  const { game } = usePuzzleSetup();

  const { handleMoveAttempt } = useMoveHandler(game);

  useMaterialEffect(game, fen);

  useEffect(() => {
    if (!isPieceSetAvailable(pieceSet)) {
      console.warn(`Piece set ${pieceSet} is not available.`);
      return;
    }

    loadPieceSetCSS(pieceSet).catch((err) => {
      console.error(`Failed to load theme CSS for ${pieceSet}:`, err);
    });
  }, [pieceSet]);

  useEffect(() => {
    if (!isBoardThemeAvailable(boardTheme)) {
      console.warn(`Board theme "${boardTheme}" is not available.`);
      return;
    }

    loadBoardThemeCSS(boardTheme).catch((err) => {
      console.error(`Failed to load board theme CSS for "${boardTheme}":`, err);
    });
  }, [boardTheme]);

  const playerColorLongForm = puzzle?.userMove.color == "w" ? "white" : "black";
  const calcMovable = () => {
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

  const turnColor = (): Color => {
    return game.turn() === "w" ? "white" : "black";
  };

  const isPromotionMove = (from: Square, to: Square): boolean => {
    const piece = game.get(from);
    if (!piece || piece.type !== "p") return false;

    const fromRank = parseInt(from[1]);
    const toRank = parseInt(to[1]);

    return (
      (piece.color === "w" && fromRank === 7 && toRank === 8) || (piece.color === "b" && fromRank === 2 && toRank === 1)
    );
  };

  const onMove = (from: string, to: string) => {
    const fromSquare = from as Square;
    const toSquare = to as Square;

    if (isPromotionMove(fromSquare, toSquare)) {
      const movingPiece = game.get(fromSquare);
      const color = movingPiece?.color === "w" ? "white" : "black";

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
      <ChessBoardLayout materials={materials}>
        <div className="box relative rounded-">
          <div className="main-board green merida my-2 " ref={boardRef}>
            <>
              <Chessground
                key={`puzzle-${fen}`}
                fen={fen}
                orientation={playerColorLongForm}
                turnColor={turnColor()}
                movable={calcMovable()}
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
                // boardSize={boardRef.current?.offsetWidth || 400}
              />
            </>
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
