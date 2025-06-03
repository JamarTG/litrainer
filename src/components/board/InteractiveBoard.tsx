import { useState, FC, useEffect, useRef } from "react";
import { Chess, Square } from "chess.js";
import ChessBoardLayout from "../layout/ChessBoardLayout";
import { useSelector } from "react-redux";
import Chessground from "react-chessground";
import MoveClassificationMarker from "./MoveClassificationMarker";
import { initialPieceCounts } from "@/constants/piece";
import { Materials } from "@/types/eval";
import { RootState } from "@/redux/store";
import { isThemeAvailable, loadThemeCSS } from "@/utils/theme-loaders/piece-theme-loader";
import { isBoardThemeAvailable, loadBoardThemeCSS } from "@/utils/theme-loaders/board-theme-loader";
import { useMaterialEffect } from "@/hooks/useMaterialEffect";
import "@/styles/chessground.css";
import PromotionModal, { PromotionData } from "./modal/PromotionModal";

interface BoardComponentProps {
  game: Chess;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, promotion: string) => boolean;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({ game, handleMoveAttempt }) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState<number>(0);

  const { puzzle, currentPuzzleIndex, fen, isPuzzleSolved, pieceSet, boardTheme } = useSelector((state: RootState) => {
    return {
      fen: state.board.fen,
      puzzle: state.puzzle.puzzles[state.puzzle.currentIndex],
      currentPuzzleIndex: state.puzzle.currentIndex,
      isPuzzleSolved: state.feedback.isPuzzleSolved,
      pieceSet: state.pieceSet.set,
      boardTheme: state.boardTheme.board
    };
  });

  useMaterialEffect(game, setMaterial);

  useEffect(() => {
    const updateBoardSize = () => {
      if (boardRef.current) {
        setBoardSize(boardRef.current.offsetWidth);
      }
    };

    updateBoardSize();

    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  useEffect(() => {
    if (!isThemeAvailable(pieceSet)) {
      console.warn(`Piece set ${pieceSet} is not available.`);
      return;
    }

    loadThemeCSS(pieceSet).catch((err) => {
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

  const playerColor = puzzle?.userMove.color === "w" ? "white" : "black";

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
      color: playerColor as any
    } 
  };

  const turnColor = () => {
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
    <>
      <ChessBoardLayout material={material}>
        <div className="box relative">
          <div className="main-board green merida my-2" ref={boardRef}>
            <Chessground
              key={`puzzle-${currentPuzzleIndex}`}
              className="relative"
              fen={fen}
              orientation={playerColor}
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
            <MoveClassificationMarker boardSize={boardSize} boardRef={boardRef} orientation={playerColor} />
          </div>
        </div>
      </ChessBoardLayout>

      <PromotionModal
        isOpen={!!promotionData}
        promotionData={promotionData}
        onPromote={handlePromotion}
        onCancel={handlePromotionCancel}
      />
    </>
  );
};

export default InteractiveChessBoard;
