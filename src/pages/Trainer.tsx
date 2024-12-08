import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STARTINGPOSFEN } from "../constants";
import { Models } from "../typings";
import { playSound } from "../utils/audio/playSound";
import { normalizeCastlingMove } from "../utils/chess/normalizeCastle";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useChangePuzzle from "../hooks/useChangePuzzle";
import FeedbackMessage from "../components/trainer/FeedbackMessage";
import WarningMessage from "../components/trainer/WarningMessage";
// import getLichessCloudEvaluation from "../utils/getLichessCloudEvaluation";

interface TrainerProps {
  puzzles: Models.Move.Info[][];
}

const Trainer: React.FC<TrainerProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess(STARTINGPOSFEN));
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<Models.Move.Info | null>(
    null
  );

  const [boardSize, setBoardSize] = useState<number>(400);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const [feedbackMessage, setFeedbackMessage] = useState<React.ReactNode>(null);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});

  const { puzzleIndex, fen, moveToNextPuzzle, moveToPreviousPuzzle, setFen } =
    useChangePuzzle(puzzles, sessionStarted, setSessionStarted);

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
  }, [currentPuzzle]);

  useEffect(() => {
    const newGame = new Chess(fen);
    setGame(newGame);
  }, [fen]);

  useEffect(() => {
    const updateBoardSize = () => {
      if (boardRef.current) {
        const width = Math.min(window.innerWidth * 0.9, 500);
        setBoardSize(width);
      }
    };

    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);

    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const initialX = e.clientX;
    const initialWidth = boardRef.current?.offsetWidth || 650;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(300, Math.min(width, 650)));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const move = attemptMove(sourceSquare, targetSquare);
      if (!move) return false;
      const isBestMove = checkBestMove(move);

      playSound(game, move);

      setFeedbackMessage(
        isBestMove ? (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />
        )
      );

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 400);

      setFen(game.fen());
      console.log("isBestMove", isBestMove);
      if (!isBestMove) {
        resetBoardAfterDelay();
      } else {
        setTimeout(() => {
          moveToNextPuzzle();
        }, 400);
      }

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
      handlePieceDrop(clickSourceSquare!, clickedSquare);
      setClickSourceSquare(null);
      setMoveSquares({});
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
            background: `radial-gradient(circle, rgba(0,0,0,.1) ${
              isCaptureMove ? "70%" : "30%"
            }, transparent 25%)`,
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

  const checkBestMove = (move: any) => {
    return (
      normalizeCastlingMove(move.lan) ===
      normalizeCastlingMove(currentPuzzle?.evaluation.best as string)
    );
  };

  const resetBoardAfterDelay = () => {
    setTimeout(() => {
      game.load(fen);
      setFen(fen);
    }, 400);
  };

  const convertMove = (
    moveNotation: string | undefined | null,
    judgment: Models.Move.Judgement | undefined
  ) => {
    if (moveNotation === null || judgment === undefined) {
      return;
    }

    const moves = game.moves({ verbose: true });
    const move = moves.find((m) => m.san === moveNotation);
    let color = "grey";

    if (judgment) {
      switch (judgment.name as string) {
        case "Blunder":
          color = "red";
          break;
        case "Mistake":
          color = "orange";
          break;
        case "Inaccuracy":
          color = "deepskyblue";
          break;
        default:
          color = "grey";
      }
    }

    return [move?.from, move?.to, move?.from && move.to ? color : ""];
  };

  const getCustomArrows = (
    currentPuzzle: Models.Move.Info | null,
    moveSquares: Record<string, any>
  ): [Square, Square, string][] => {
    if (currentPuzzle && Object.keys(moveSquares).length === 0) {
      const {
        move,
        evaluation: { judgment },
      } = currentPuzzle;
      return [convertMove(move, judgment) as [Square, Square, string]];
    }
    return [];
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <WarningMessage
        show={showWarning}
        onClose={() => setShowWarning(false)}
      />
      <div className="flex">
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
            boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
            customArrows={getCustomArrows(currentPuzzle, moveSquares)}
            boardWidth={boardSize}
            customSquareStyles={{
              ...moveSquares,
            }}
          />

          <FeedbackMessage message={feedbackMessage} />
          <ResizeHandle
            resizeRef={resizeRef}
            handleMouseDown={handleMouseDown}
          />
        </div>
        <ControlPanel
          puzzles={puzzles}
          puzzleIndex={puzzleIndex}
          currentPuzzle={currentPuzzle}
          moveToNextPuzzle={moveToNextPuzzle}
          moveToPreviousPuzzle={moveToPreviousPuzzle}
          sessionStarted={sessionStarted}
        />
      </div>
    </div>
  );
};

export default Trainer;
