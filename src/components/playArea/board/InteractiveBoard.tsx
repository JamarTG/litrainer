import { useState, useMemo, FC, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { Materials } from "../../../types/eval";
import Marker from "./MoveClassificationMarker";
import BoardPlayerInfo from "../header/BoardPlayerInfo";
import { useMaterialEffect } from "../../../hooks/useMaterialEffect";
import { initialPieceCounts } from "../../../constants/piece";
import CustomPieces from "./CustomPieces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCustomSquareStyles } from "../helpers/squareStyles";
import { calculateBoardSize } from "../../../utils/chess/board";
import useThrottledResize from "../../../hooks/useThrottledResize";
import Chessground from "react-chessground";

import "../../../styles/chessground.css";

import { isThemeAvailable, loadThemeCSS } from "../../../utils/pieceThemeLoader";
import { isBoardThemeAvailable, loadBoardThemeCSS } from "../../../utils/boardThemeLoader";

interface BoardComponentProps {
  game: Chess;
  handleSquareClick: (srcSquare: Square) => void;
  handleMoveAttempt: (sourceSquare: Square, targetSquare: Square, piece: string) => boolean;
  unhighlightLegalMoves: () => void;
}

const InteractiveChessBoard: FC<BoardComponentProps> = ({ game, handleSquareClick, handleMoveAttempt, unhighlightLegalMoves }) => {
  const [material, setMaterial] = useState<Materials>(initialPieceCounts);
  const [lastMove, setLastMove] = useState<[string, string] | undefined>();

  const { fen, moveSquares, destinationSquare, sourceSquare, isLoading } = useSelector((state: RootState) => state.board);
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex]);
  const { classification, isPuzzleSolved } = useSelector((state: RootState) => state.feedback);
  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);
  const boardTheme = useSelector((state: RootState) => state.boardTheme.board);

  useMaterialEffect(game, setMaterial);

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

  // Keep local board FEN in sync with redux state

  // Update last move display when redux state changes
  useEffect(() => {
    if (sourceSquare && destinationSquare) {
      setLastMove([sourceSquare, destinationSquare]);
    }
  }, [sourceSquare, destinationSquare]);

  const customSquareStyles = useMemo(
    () => getCustomSquareStyles(destinationSquare as Square, sourceSquare as Square, classification, moveSquares, isLoading),
    [destinationSquare, sourceSquare, classification, moveSquares, isLoading]
  );

  const customPieces = useMemo(() => CustomPieces(pieceSet), [pieceSet]);
  const boardSize = useThrottledResize(() => calculateBoardSize(window.innerWidth, window.innerHeight), 200);

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
      <div className="box">
        <div className="main-board green merida my-2">
          <Chessground
            // className="relative flex flex-col justify-center items-center gap-2"
            fen={fen}
            orientation={playerColor}
            turnColor={turnColor()}
            movable={calcMovable()}
            lastMove={lastMove as any}
            onMove={onMove}
          />
        </div>
      </div>

      <Marker boardSize={boardSize} />
    </BoardPlayerInfo>
  );
};

export default InteractiveChessBoard;
