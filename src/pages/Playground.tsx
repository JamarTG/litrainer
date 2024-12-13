import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { Models } from "../typings";
import { playMoveSound } from "../utils/audio/playMoveSound";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import WarningMessage from "../components/trainer/WarningMessage";
import useResizeableBoard from "../hooks/useResizableBoard";
import checkGoodMove from "../utils/chess/checkGoodMove";
import useCurrentPuzzle from "../hooks/useCurrentPuzzle";
import { boardDimensions } from "../constants";
import { moveSquareStyles } from "../constants";

interface PlayGroundProps {
  puzzles: Models.Move.Info[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
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
  const [isGoodMove, setIsGoodMove] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [destSquare, setDestSquare] = useState<string | null>(null);
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});


  const { puzzleIndex, fen, setFen, moveToNextPuzzle, moveToPreviousPuzzle, acceptableMoves } =
    useChangePuzzle(puzzles, sessionStarted, setSessionStarted);
  useCurrentPuzzle(puzzles, puzzleIndex, setCurrentPuzzle);

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

  const handlePieceDrop = 
    (sourceSquare: string, targetSquare: string) => {
      const move = attemptMove(sourceSquare, targetSquare);

      if (!move) return false;

      playMoveSound(game, move);
      
      const localIsGoodMove = checkGoodMove(acceptableMoves.map(m => m.move), move.lan);

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
    }

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
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3">
      <WarningMessage
        show={showWarning}
        onClose={() => setShowWarning(false)}
      />
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
          boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
          boardWidth={boardSize}
          customSquareStyles={{
            ...moveSquares,
            ...(destSquare && {
              [destSquare]: {
                position: "relative",
                zIndex: 0,
                backgroundImage: isGoodMove
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
      <small className="text-sm absolute bottom-0">{JSON.stringify(acceptableMoves)}. You played {currentPuzzle?.move}</small>
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

export default Playground;
