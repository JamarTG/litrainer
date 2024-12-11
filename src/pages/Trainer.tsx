import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { STARTINGPOSFEN } from "../constants";
import { Models } from "../typings";
import { playMoveSound } from "../utils/audio/playMoveSound";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import WarningMessage from "../components/trainer/WarningMessage";
import useResizeableBoard from "../hooks/useResizableBoard";
import checkBestMove from "../utils/chess/checkBestMove";
import useCurrentPuzzle from "../hooks/useCurrentPuzzle";
import { boardDimensions } from "../constants";
import { moveSquareStyles } from "../constants";

interface TrainerProps {
  puzzles: Models.Move.Info[][];
}

const Trainer: React.FC<TrainerProps> = ({ puzzles }) => {
  const { boardSize, setBoardSize, boardRef, resizeRef, handleMouseDown } =
    useResizeableBoard(
      boardDimensions.INITIAL_SIZE,
      boardDimensions.MIN_SIZE,
      boardDimensions.MAX_SIZE
    );

  const [game, setGame] = useState<Chess>(new Chess());
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<Models.Move.Info | null>(
    null
  );
  const [isBestMove, setIsBestMove] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [destSquare, setDestSquare] = useState<string | null>(null);
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});

  const { puzzleIndex, fen, moveToNextPuzzle, moveToPreviousPuzzle, setFen } =
    useChangePuzzle(puzzles, sessionStarted, setSessionStarted);
  useCurrentPuzzle(puzzles, puzzleIndex, setCurrentPuzzle);

  useEffect(() => {
    const stockfish = new Worker("./stockfish.js");
    const DEPTH = 8; 
    const MULTIPV = 3; 
    const FEN_POSITION =
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    stockfish.postMessage("uci");
    stockfish.postMessage(`setoption name MultiPV value ${MULTIPV}`);
    stockfish.postMessage(`position fen ${FEN_POSITION}`);
    stockfish.postMessage(`go depth ${DEPTH}`);

    stockfish.onmessage = (event) => {
      const data = event.data;
      let moves = []
      if (data.startsWith("info")) {
        moves = data.split(" pv ")[1]?.split(" ") || [];
        postMessage(moves);
      }
      console.log(moves);
    };
    return () => {
      stockfish.terminate();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const newSize = Math.max(
          boardDimensions.MIN_SIZE,
          Math.min(
            boardDimensions.MAX_SIZE,
            Math.min(window.innerWidth - 100, window.innerHeight - 100)
          )
        );
        setBoardSize(newSize);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    boardRef,
    setBoardSize,
    boardDimensions.MIN_SIZE,
    boardDimensions.MAX_SIZE,
  ]);

  useEffect(() => {
    const puzzle = puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null;
    setCurrentPuzzle(puzzle);

    if (puzzle) {
      setGameFen(game, puzzle.fen);
      executeComputerMove(game, puzzle.lastMove);
    }
  }, [puzzleIndex, puzzles, setFen]);

 
  const executeComputerMove = useCallback(
    (game: Chess, move: string) => {
      setTimeout(() => {
        const executedMove = game.move(move);
        playMoveSound(game, executedMove);
        setGame(game);
        setFen(game.fen());
      }, 1000);
    },
    [setFen]
  );

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

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const move = attemptMove(sourceSquare, targetSquare);

      if (!move) return false;

      playMoveSound(game, move);

      const localIsBestMove = checkBestMove(move, currentPuzzle);

      setDestSquare(targetSquare);
      setFen(game.fen());
      setMoveSquares([]);

      setIsBestMove(localIsBestMove);
      setTimeout(
        localIsBestMove ? moveToNextPuzzle : () => setGameFen(game, fen),
        500
      );
      setTimeout(() => setDestSquare(null), 500);
      setTimeout(() => setIsBestMove(null), 500);

      return true;
    },
    [game, fen, currentPuzzle?.evaluation.best, puzzleIndex]
  );

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

  const attemptMove = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        return move;
      } catch (error) {
        console.error("Move failed", error);
      }
    },
    [game]
  );

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 ">
      <WarningMessage
        show={showWarning}
        onClose={() => setShowWarning(false)}
      />
      <div
        ref={boardRef}
        className="relative"
        style={{
          width: `${boardSize}px`,
          height: `${boardSize}px`,
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
          boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
          boardWidth={boardSize}
          customSquareStyles={{
            ...moveSquares,
            ...(destSquare && {
              [destSquare]: {
                position: "relative",
                zIndex: 0,
                backgroundImage: isBestMove
                  ? "url('/svgs/correct.png')"
                  : "url('/svgs/incorrect.png')",
                backgroundSize: "30%",
                backgroundPosition: "top right",
                backgroundRepeat: "no-repeat",

                pointerEvents: "none",
              },
            }),
          }}
        />
        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>

      <ControlPanel
        game={game}
        currentPuzzle={currentPuzzle}
        moveToNextPuzzle={moveToNextPuzzle}
        moveToPreviousPuzzle={moveToPreviousPuzzle}
        sessionStarted={sessionStarted}
      />
    </div>
  );
};

export default Trainer;
