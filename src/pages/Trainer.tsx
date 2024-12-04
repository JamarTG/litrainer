import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STARTINGPOSFEN} from "../constants";
import { Models } from "../typings";
import { playGameSound } from "../utils/playSound";
import { normalizeCastlingMove } from "../utils/normalizeCastle";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ControlPanel from "../components/trainer/ControlPanel";

import ResizeHandle from "../components/trainer/ResizeHandle";
import useMoveToNextPuzzle from "../hooks/useMoveToNextPuzzle";

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

  const { puzzleIndex, fen, moveToNextPuzzle, setFen } = useMoveToNextPuzzle(puzzles);

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


  const handleMouseDown = (e: React.MouseEvent) => {
    const initialX = e.clientX;
    const initialWidth = boardRef.current?.offsetWidth || 400;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - initialX);
      setBoardSize(Math.max(300, Math.min(width, 500)));
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

  const handleSquareClick = (square: string) => {
    if (!clickSourceSquare) {
      setClickSourceSquare(square);
    } else {
      handlePieceDrop(clickSourceSquare, square);
      setClickSourceSquare(null);
    }
  };

  const attemptMove = (sourceSquare: string, targetSquare: string) => {
    return game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
  };

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

  const convertMove = (moveNotation: string | undefined | null) => {
    if (moveNotation === null) {
      return;
    }

    const moves = game.moves({ verbose: true });
    const move = moves.find((m) => m.san === moveNotation);
    return [move?.from, move?.to, move?.from && move.to ? "red" : ""];
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* <div className="flex flex-col items-center"> */}
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
              onSquareClick={handleSquareClick}
              onPieceDrop={handlePieceDrop}
              boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
              customArrows={[convertMove(currentPuzzle?.move) as any]}
              boardWidth={boardSize}
            />
            {feedbackMessage && (
              <div
                className={`feedback-message ${
                  feedbackMessage ? "fade-out" : ""
                }`}
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
          />
        </div>
      {/* </div> */}
    </div>
  );
};

export default Trainer;
