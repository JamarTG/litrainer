import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { STARTINGPOSFEN } from "../constants";
import { Models } from "../typings";
import { playSound } from "../utils/audio/playSound";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import WarningMessage from "../components/trainer/WarningMessage";
import useResizeableBoard from "../hooks/useResizableBoard";
import checkBestMove from "../utils/chess/checkBestMove";
import resetBoardAfterDelay from "../utils/chess/resetBoardAfterDelay";
import useCurrentPuzzle from "../hooks/useCurrentPuzzle";
import nextPuzzleAfterDelay from "../utils/chess/nextPuzzleAfterDelay";
import { boardDimensions } from "../constants";

interface TrainerProps {
  puzzles: Models.Move.Info[][];
}


const Trainer: React.FC<TrainerProps> = ({ puzzles }) => {
  const { MIN_SIZE, MAX_SIZE, INITIAL_SIZE } = boardDimensions;

  const { boardSize, setBoardSize, boardRef, resizeRef, handleMouseDown } =
    useResizeableBoard(INITIAL_SIZE, MIN_SIZE, MAX_SIZE);

  // useInitializeGame(currentPuzzle, setGame, setFen, playSound);
  const [game, setGame] = useState<Chess>(new Chess(STARTINGPOSFEN));
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<Models.Move.Info | null>(
    null
  );
  const [isBestMove, setIsBestMove] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [clickDestSquare, setClickDestSquare] = useState<string | null>(null);
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const { puzzleIndex, fen, moveToNextPuzzle, moveToPreviousPuzzle, setFen } =
    useChangePuzzle(puzzles, sessionStarted, setSessionStarted);
  useCurrentPuzzle(puzzles, puzzleIndex, setCurrentPuzzle);

  useEffect(() => {
    const stockfish = new Worker("./stockfish.js");
    const DEPTH = 8; // number of halfmoves the engine looks ahead
    const MULTIPV = 3; // number of best moves to consider
    const FEN_POSITION =
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    stockfish.postMessage("uci");
    stockfish.postMessage(`setoption name MultiPV value ${MULTIPV}`);
    stockfish.postMessage(`position fen ${FEN_POSITION}`);
    stockfish.postMessage(`go depth ${DEPTH}`);

    stockfish.onmessage = (e) => {
      console.log(e.data); // in the console output you will see `bestmove e2e4` message
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current) {
        const newSize = Math.max(
          MIN_SIZE,
          Math.min(
            MAX_SIZE,
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
  }, [boardRef, setBoardSize, MIN_SIZE, MAX_SIZE]);

  useEffect(() => {
    setCurrentPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);
  }, [puzzleIndex, puzzles]);

  useEffect(() => {
    if (currentPuzzle) {
      const newGame = new Chess(currentPuzzle.fen);
      setGame(newGame);
      setFen(newGame.fen());

      if (currentPuzzle.lastMove) {
        setTimeout(() => {
          const move = newGame.move(currentPuzzle.lastMove);
          playSound(newGame, move);
          setGame(newGame);
          setFen(newGame.fen());
        }, 1000);
      }
    }
  }, [currentPuzzle, setFen]);

  const unhighlightSquares = useCallback(() => {
    setClickSourceSquare(null);
    setMoveSquares({});
  }, []);

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const move = attemptMove(sourceSquare, targetSquare);

      unhighlightSquares();

      const isMoveInvalid = !move;

      if (isMoveInvalid) return false;

      playSound(game, move);

      const localIsBestMove = checkBestMove(move, currentPuzzle);

      setClickDestSquare(targetSquare);

      setTimeout(() => setClickDestSquare(null), 500);

      setIsBestMove(checkBestMove(move, currentPuzzle));
      setIsTransitioning(true);
      setFen(game.fen());
      setTimeout(() => setIsTransitioning(false), 300);
      setFen(game.fen());

      localIsBestMove
        ? nextPuzzleAfterDelay(500, moveToNextPuzzle, setMoveSquares)
        : resetBoardAfterDelay(game, fen, setFen);
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
        [clickedSquare]: {
          borderRadius: "50%",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
          transform: "scale(0.7)",
        },
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
          [clickedSquare]: {
            borderRadius: "50%",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
            transform: "scale(0.7)",
          },
        });

        highlightLegalMoves(legalMovesFromClickedSquare);
      } else {
        handlePieceDrop(clickSourceSquare!, clickedSquare);
        setClickDestSquare(clickedSquare);
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
            ...(clickDestSquare && {
              [clickDestSquare]: {
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
          customBoardStyle={{
            opacity: isTransitioning ? 0.3 : 1,
            backgroundColor: "red",
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
