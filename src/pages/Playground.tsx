import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { useEngine } from "../hooks/useEngine";
import { EngineName } from "../types/enums";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import { BOARD_DIMENSIONS, moveSquareStyles } from "../constants";
import { getCustomSquareStyles } from "../utils/getCustomSquareStyles";
import { attemptMove } from "../utils/chess";
import { BestMove } from "../types/move";
import PuzzleControlPanel from "../components/trainer/PuzzleControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import useResizeableBoard from "../hooks/useResizableBoard";
import checkGoodMove from "../utils/chess";
import MoveAnalysisPanel from "../components/trainer/MoveAnalysisPanel";
import useEngineMoves from "../hooks/useEngineMoves";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const { boardSize, boardRef, resizeRef, handleMouseDown } =
    useResizeableBoard(
      BOARD_DIMENSIONS.INITIAL_SIZE,
      BOARD_DIMENSIONS.MIN_SIZE,
      BOARD_DIMENSIONS.MAX_SIZE
    );

  const [game, setGame] = useState<Chess>(new Chess());
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [isGoodMove, setIsGoodMove] = useState<boolean | null>(null);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );

  const [destSquare, setDestSquare] = useState<string | null>(null);
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});

  const [bestMoves, setBestMoves] = useState<BestMove[] | null>(null);

  const {
    puzzleIndex,
    fen,
    setFen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
    sessionStarted,
  } = useChangePuzzle(
    puzzles,

    setPuzzle
  );

  const engine = useEngine(EngineName.Stockfish16);

  useEngineMoves({ puzzle, engine, setBestMoves});

  useEffect(() => {
    const executeComputerMove = (game: Chess, move: string) => {
      setTimeout(() => {
        const executedMove = game.move(move);
        playSound(game, executedMove as Move);
        setGame(game);
        const newFen = game.fen();
        setFen(newFen);
      }, 500);
    };

    const puzzle = puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null;
    setPuzzle(puzzle);

    if (puzzle) {
      setGameFen(game, puzzle.fen.previous);
      if (puzzle.opponentMove?.lan) {
        executeComputerMove(game, puzzle.opponentMove.lan);
      }
    }
  }, [puzzleIndex, puzzles, setFen]);

  const unhighlightSquares = useCallback(() => {
    setClickSourceSquare(null);
    setMoveSquares({});
  }, []);

  const setGameFen = useCallback(
    (game: Chess, fen: string) => {
      game.load(fen);
      setFen(fen);
    },
    [game, fen]
  );

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    const move = attemptMove(game, sourceSquare, targetSquare);

    if (!move) return false;

    playSound(game, move);

    const localIsGoodMove = bestMoves
      ? checkGoodMove(
          bestMoves.map((m) => m.move),
          move.lan
        )
      : false;

    setDestSquare(targetSquare);
    setFen(game.fen());
    setMoveSquares([]);

    setIsGoodMove(localIsGoodMove);
    setTimeout(
      localIsGoodMove ? moveToNextPuzzle : () => setGameFen(game, fen),
      500
    );
    setTimeout(() => setDestSquare(null), 500);
    setTimeout(() => setIsGoodMove(null), 500);

    return true;
  };

  const handleSquareClick = (clickedSquare: Square) => {
    const clickedPiece = game.get(clickedSquare);
    const isValidFirstClick = !clickSourceSquare && clickedPiece;
    const isSecondClick = clickSourceSquare;

    if (isValidFirstClick) {
      setClickSourceSquare(clickedSquare);

      const legalMovesFromClickedSquare = game.moves({
        square: clickedSquare,
        verbose: true,
      });
      setMoveSquares({
        [clickedSquare]: moveSquareStyles,
      });

      highlightLegalMoves(legalMovesFromClickedSquare);
    } else if (isSecondClick) {
      if (clickedPiece && clickedPiece.color === game.turn()) {
        setClickSourceSquare(clickedSquare);

        const legalMovesFromClickedSquare = game.moves({
          square: clickedSquare,
          verbose: true,
        });
        setMoveSquares({
          [clickedSquare]: moveSquareStyles,
        });

        highlightLegalMoves(legalMovesFromClickedSquare);
      } else {
        handlePieceDrop(clickSourceSquare!, clickedSquare);
        setDestSquare(clickedSquare);
        unhighlightSquares();
      }
    }
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      const legalDestinationSquares = legalMoves.map((move) => move.to);

      const highlightedSquaresStyles = legalDestinationSquares.reduce(
        (styles, square) => {
          const isCaptureMove = legalMoves.some(
            (move) => move.to === square && move.captured
          );

          const squareStyle = {
            background: `radial-gradient(circle, ${
              isCaptureMove ? "rgba(2,0,0,.2)" : "rgba(0,0,0,.1)"
            } ${isCaptureMove ? "60%" : "30%"}, transparent 25%)`,
            borderRadius: "50%",
            zIndex: 1,
          };

          styles[square] = squareStyle;
          return styles;
        },
        {} as Record<string, any>
      );
      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
      <div
        ref={boardRef}
        className="relative flex justify-center items-center"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: `${boardSize}px`,
          maxHeight: `${boardSize}px`,
        }}
      >
        <Chessboard
          position={fen}
          showBoardNotation={true}
          onSquareClick={handleSquareClick}
          animationDuration={200}
          onPieceDrop={handlePieceDrop}
          onPieceDragBegin={unhighlightSquares}
          onPieceDragEnd={unhighlightSquares}
          boardOrientation={puzzle?.userMove.color == "w" ? "white" : "black"}
          boardWidth={boardSize}
          customSquareStyles={getCustomSquareStyles(
            moveSquares,
            destSquare,
            isGoodMove
          )}
        />
        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>

      <MoveAnalysisPanel puzzle={puzzle} bestMoves={bestMoves} />
      <PuzzleControlPanel
        game={game}
        puzzle={puzzle}
        moveToNextPuzzle={moveToNextPuzzle}
        moveToPreviousPuzzle={moveToPreviousPuzzle}
        sessionStarted={sessionStarted}
      />
    </div>
  );
};

export default Playground;
