import { useState, FC, useEffect, useRef } from "react";
import { Chess, Square } from "chess.js";
import BoardPlayerInfo from "./header/BoardPlayerInfo";
import { useSelector } from "react-redux";
import Chessground from "react-chessground";
import MoveClassificationMarker from "./MoveClassificationMarker";
import { initialPieceCounts } from "../../constants/piece";
import { Materials } from "../../types/eval";
import { RootState } from "../../redux/store";
import { isThemeAvailable, loadThemeCSS } from "../../utils/theme-loaders/piece-theme-loader";
import { isBoardThemeAvailable, loadBoardThemeCSS } from "../../utils/theme-loaders/board-theme-loader";
import { useMaterialEffect } from "../../hooks/useMaterialEffect";
import "../../styles/chessground.css";

interface BoardComponentProps {
  game: Chess;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({ game, handleMoveAttempt }) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);
  const [, setLastMove] = useState<[string, string] | undefined>();

  const boardRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState<number>(0);

  const { fen, destinationSquare, sourceSquare } = useSelector((state: RootState) => state.board);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  const { isPuzzleSolved } = useSelector((state: RootState) => state.feedback);
  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);
  const boardTheme = useSelector((state: RootState) => state.boardTheme.board);

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

  useEffect(() => {
    if (sourceSquare && destinationSquare) {
      setLastMove([sourceSquare, destinationSquare]);
    }
  }, [sourceSquare, destinationSquare]);

  const playerColor = puzzle?.userMove.color === "w" ? "white" : "black";

  const calcMovable = () => {
    if (isPuzzleSolved) {
      return {
        free: false,
        dests: new Map(),
        color: undefined as any,
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
      color: playerColor as any,
    };
  };

  const turnColor = () => {
    return game.turn() === "w" ? "white" : "black";
  };

  const onMove = (from: string, to: string) => {
    handleMoveAttempt(from as Square, to as Square, "");
  };

  return (
    <BoardPlayerInfo material={material}>
      <div className="box relative">
        <div
          className="main-board green merida my-2"
          ref={boardRef}
        >
          <Chessground
            className="relative"
            fen={fen}
            orientation={playerColor}
            turnColor={turnColor()}
            movable={calcMovable()}
            lastMove={undefined}
            onMove={onMove}
          />
          <MoveClassificationMarker
            boardSize={boardSize}
            boardRef={boardRef}
            orientation={playerColor}
          />
        </div>
      </div>
    </BoardPlayerInfo>
  );
};

export default InteractiveChessBoard;

