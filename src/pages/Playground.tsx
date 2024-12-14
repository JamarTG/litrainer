import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { playMoveSound } from "../utils/audio/playMoveSound";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import WarningMessage from "../components/trainer/WarningMessage";
import useResizeableBoard from "../hooks/useResizableBoard";
import checkGoodMove from "../utils/chess/checkGoodMove";
import { boardDimensions } from "../constants";
import { moveSquareStyles } from "../constants";
import { useEngine } from "../hooks/useEngine";
import { EngineName } from "../types/enums";
import { PositionEval } from "../types/eval";
import { getLineWinPercentage } from "../utils/math/winPercentage";
import { Game } from "../types/game";

interface PlayGroundProps {
  puzzles: Game.Info[][];
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
  const [currentPuzzle, setCurrentPuzzle] = useState<Game.Info | null>(null);
  const [isGoodMove, setIsGoodMove] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [evaluation, setEvaluation] = useState<PositionEval | null>(null);
  const [destSquare, setDestSquare] = useState<string | null>(null);
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});

  const [acceptableMoves, setAcceptableMoves] = useState<
    { move: string; eval: number }[] | null
  >(null);
  const { puzzleIndex, fen, setFen, moveToNextPuzzle, moveToPreviousPuzzle } =
    useChangePuzzle(
      puzzles,
      sessionStarted,
      setSessionStarted,
      setCurrentPuzzle
    );

  const engine = useEngine(EngineName.Stockfish16);

  const lastFivePuzzles = puzzles[puzzleIndex.x];

  useEffect(() => {
    const fetchData = async () => {
      if (currentPuzzle) {
        // await evaluateFen(
        //   currentPuzzle.fenAfterOpponentMove,
        //   setAcceptableMoves
        // );

        setAcceptableMoves([])

        const position = await engine?.evaluatePosition(
          currentPuzzle.fenAfterOpponentMove
        );

        
        const result = position?.lines
          .map(({ pv, cp }) => ({
            move: pv[0], 
            eval: cp 
          }))
          .filter((line) => line.eval !== undefined) as { move: string; eval: number }[];
        setAcceptableMoves(result || []);

        // if (winPercentageDiff < -20) return MoveClassification.Blunder;
        // if (winPercentageDiff < -10) return MoveClassification.Mistake;
        // if (winPercentageDiff < -5) return MoveClassification.Inaccuracy;
        // if (winPercentageDiff < -2) return MoveClassification.Good;
        // return MoveClassification.Excellent;
        // Also There is Best and Book Move

        if (position !== undefined) {
          setEvaluation(position);
          console.log(position);
          const bestMoveWinPercentage = getLineWinPercentage(position.lines[0]);
          for (let i = 0; i < position.lines.length; i++) {
            const line = position.lines[i];
            const currentWinPercentage = getLineWinPercentage(line);
            const difference = currentWinPercentage - bestMoveWinPercentage;
            console.log(currentWinPercentage, difference);
          }
        }
      }
    };
    fetchData();
  }, [currentPuzzle, puzzleIndex]);

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
      setGameFen(game, puzzle.fenBeforeOpponentMove);
      executeComputerMove(game, puzzle.lastMove);
    }
  }, [puzzleIndex, puzzles, setFen]);

  const executeComputerMove = useCallback(
    (game: Chess, move: string) => {
      setTimeout(() => {
        const executedMove = game.move(move);
        playMoveSound(game, executedMove);
        setGame(game);
        const newFen = game.fen();
        setFen(newFen);
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

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    const move = attemptMove(sourceSquare, targetSquare);

    if (!move) return false;

    playMoveSound(game, move);

    const localIsGoodMove = acceptableMoves
      ? checkGoodMove(
          acceptableMoves.map((m) => m.move),
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
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 bg-red-900 items-center">
      <WarningMessage
        show={showWarning}
        onClose={() => setShowWarning(false)}
      />

      <div
        className="hidden lg:flex flex-col items-center"
        style={{ width: "150px" }}
      >
        {lastFivePuzzles
          .slice(Math.max(0, puzzleIndex.y - 5), puzzleIndex.y)
          .map((puzzle, index) => (
            <div key={index} className="flex items-center space-x-4 p-2">
              <div className="flex-shrink-0">
                <Chessboard
                  position={puzzle.fenAfterOpponentMove}
                  boardWidth={boardSize / 8}
                  showBoardNotation={false}
                  arePiecesDraggable={false}
                />
              </div>
            </div>
          ))}
      </div>

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

      <div
        className="absolute bottom-0 right-0 p-2  bg-opacity-75 text-xs rounded shadow-md"
        style={{ width: "200px" }}
      >
        <div>
          <strong>Severity:</strong>{" "}
          {JSON.stringify(currentPuzzle?.evaluation.judgment.name)}
        </div>
        <div>
          <strong>Acceptable Moves:</strong>{" "}
          {acceptableMoves?.map((move) => JSON.stringify(move)).join(", ")}
        </div>
        <div>
          <strong>You played:</strong> {currentPuzzle?.move}
        </div>
        <div>
          <strong>Current Puzzle:</strong>{" "}
          {JSON.stringify(currentPuzzle?.fenAfterOpponentMove)}
        </div>
        <div>
          <strong>Other Eval:</strong> {JSON.stringify(evaluation)}
        </div>
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

export default Playground;
