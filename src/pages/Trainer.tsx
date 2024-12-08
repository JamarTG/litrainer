import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STARTINGPOSFEN } from "../constants";
import { Models } from "../typings";
import { playGameSound } from "../utils/playSound";
import { normalizeCastlingMove } from "../utils/normalizeCastle";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ControlPanel from "../components/trainer/ControlPanel";
import ResizeHandle from "../components/trainer/ResizeHandle";
import useMoveToNextPuzzle from "../hooks/useChangePuzzle";
// import getLichessCloudEvaluation from "../utils/getLichessCloudEvaluation";

interface TrainerProps {
  puzzles: Models.Move.Info[][];
}

const Trainer: React.FC<TrainerProps> = ({ puzzles }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<Models.Move.Info | null>(
    null
  );
  const [game, setGame] = useState<Chess>(new Chess(STARTINGPOSFEN));
  const [boardSize, setBoardSize] = useState<number>(400);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<React.ReactNode>(null);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({});

  const {
    sessionStarted,
    puzzleIndex,
    fen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
    setFen,
  } = useMoveToNextPuzzle(puzzles);

  useEffect(() => {
    setCurrentPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);
  }, [puzzleIndex, puzzles]);

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

  // useEffect(() => {
  //   const fetchAnalysis = async () => {
  //     const token = "YOUR_LICHESS_API_TOKEN"; // Replace with your Lichess API token
  //     try {
  //       const analysis = await getLichessCloudEvaluation(fen, token);
  //       const threshold = 50;

  //       if (analysis) {
  //         const bestScore = analysis[0].cp;
  //         const goodMoves = analysis
  //           .filter((pv: any) => Math.abs(pv.cp - bestScore) <= threshold)
  //           .map((pv: any) => ({
  //             move: pv.moves[0],
  //             evaluation: pv.cp / 100,
  //           }));
  //         setGoodMoves(goodMoves);
  //       } else {
  //         setGoodMoves([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching analysis from Lichess:", error);
  //       setGoodMoves([]);
  //     }
  //   };

  //   if (fen) {
  //     fetchAnalysis();
  //   }
  // }, [fen]);

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
      playGameSound(isBestMove);

      setFeedbackMessage(
        isBestMove ? (
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />
        )
      );

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 900);

      setFen(game.fen());
      if (!isBestMove) resetBoardAfterDelay();

      return true;
    },
    [game, fen, currentPuzzle?.evaluation.best, puzzleIndex]
  );

  const handleSquareClick = (square: Square) => {
    const piece = game.get(square);

    // If no source square is selected and the clicked square has a piece, set it as the source square
    if (!clickSourceSquare && piece) {
      setClickSourceSquare(square);

      // Get the legal moves for the selected piece
      const legalMoves = game.moves({ square: square, verbose: true });
      setMoveSquares({
        [square]: {
          borderRadius: "50%",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)", // Smaller shadow for a subtle effect
          transform: "scale(0.7)",
        },
      });

      highlightLegalMoves(legalMoves);
    } else {
      handlePieceDrop(clickSourceSquare!, square);
      setClickSourceSquare(null);
      setMoveSquares({});
    }
  };

  const highlightLegalMoves = useCallback(
    (moves: Move[]) => {
      const legalSquares = moves.map((move) => move.to);

      const moveSquaresStyles = legalSquares.reduce((acc, square) => {
        const moveStyle = moves.find(
          (move) => move.to === square && move.captured
        )
          ? {
              background:
                "radial-gradient(circle, rgba(0,0,0,.1) 70%, transparent 25%)",
              borderRadius: "50%",
              zIndex: 1,
            }
          : {
              background:
                "radial-gradient(circle, rgba(0,0,0,.1) 30%, transparent 25%)",
              borderRadius: "50%",
              zIndex: 1,
            };

        acc[square] = moveStyle;

        return acc;
      }, {} as Record<string, any>);
      setMoveSquares(moveSquaresStyles);
    },
    [setMoveSquares]
  );

  const attemptMove = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      console.log("Attempting move", sourceSquare, targetSquare);
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
    }, 1000);
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
    let color = "grey"; // Default color

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {showWarning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
          <div className="text-center">
            <p className="text-yellow-500 text-sm font-bold animate-pulse mb-4">
              🚧 Training mode is currently under development. Stay tuned for
              updates!
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="border-2 border-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
            onPieceDrop={handlePieceDrop}
            boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
            customArrows={
              convertMove(
                currentPuzzle?.move,
                currentPuzzle?.evaluation.judgment
              )
                ? [
                    convertMove(
                      currentPuzzle?.move,
                      currentPuzzle?.evaluation.judgment
                    ) as [Square, Square, string],
                  ]
                : []
            }
            boardWidth={boardSize}
            customSquareStyles={{
              ...moveSquares,
            }}
          />
          {feedbackMessage && (
            <div
              className={`feedback-message ${
                feedbackMessage ? "fade-out" : ""
              } absolute inset-0 flex items-center justify-center text-6xl`}
              style={{
                zIndex: 10,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {feedbackMessage}
            </div>
          )}
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
