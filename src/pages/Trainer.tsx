import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons/faUpRightAndDownLeftFromCenter";
import { STARTINGPOSFEN, INITIAL_INDEX_STATE } from "../constants";
import { Models } from "../typings";
import { playGameSound } from "../utils/playSound";
import { normalizeCastlingMove } from "../utils/normalizeCastle";
import {
  faChessKing,
  faChessQueen,
  faChessRook,
  faArrowRight,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface TrainerProps {
  puzzles: Models.Move.Info[][];
}

const Trainer: React.FC<TrainerProps> = ({ puzzles }) => {
  const [fen, setFen] = useState(STARTINGPOSFEN);
  const [currentIndex, setCurrentIndex] =
    useState<Models.Move.Index>(INITIAL_INDEX_STATE);
  const [currentPuzzle, setCurrentPuzzle] = useState<Models.Move.Info | null>(
    null
  );
  const [game, setGame] = useState<Chess>(new Chess(STARTINGPOSFEN));
  const [boardSize, setBoardSize] = useState<number>(400);
  const boardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  console.log(currentPuzzle);

  useEffect(() => {
    setCurrentPuzzle(puzzles[currentIndex.x]?.[currentIndex.y] || null);
  }, [currentIndex, puzzles]);

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

  const moveToNextPuzzle = () => {
    if (puzzles.length === 0) return;

    let newIndex;
    let newFen;

    if (currentIndex.y + 1 < puzzles[currentIndex.x]?.length) {
      newIndex = { x: currentIndex.x, y: currentIndex.y + 1 };
      newFen = puzzles[currentIndex.x][currentIndex.y + 1].fen;
    } else if (currentIndex.x + 1 < puzzles.length) {
      newIndex = { x: currentIndex.x + 1, y: 0 };
      newFen = puzzles[currentIndex.x + 1][0].fen;
    } else {
      newIndex = { x: 0, y: 0 };
      newFen = puzzles[0][0].fen;
    }

    setCurrentIndex(newIndex);
    setFen(newFen);
  };

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
      setFen(game.fen());
      if (!isBestMove) resetBoardAfterDelay();

      return true;
    },
    [game, fen, currentPuzzle?.evaluation.best, currentIndex]
  );

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
      <div className="flex flex-col items-center">
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
              onPieceDrop={handlePieceDrop}
              boardOrientation={currentPuzzle?.colorToPlay as "black" | "white"}
              customArrows={[convertMove(currentPuzzle?.move) as any]}
              boardWidth={boardSize}
            />
            <div
              ref={resizeRef}
              onMouseDown={handleMouseDown}
              className="absolute bottom-[-23px] right-[-25px] w-5 h-5 cursor-se-resize"
            >
              <FontAwesomeIcon
                icon={faUpRightAndDownLeftFromCenter}
                className="transform rotate-90"
              />
            </div>
          </div>
          <div className="ml-4 flex flex-col space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg w-96 flex-grow">
            <div className="flex items-center mb-4 gap-2">
              <FontAwesomeIcon
                icon={faChessKing}
                className="text-white text-2xl mb-2"
              />
              <p>
                {currentIndex.x + 1} / {puzzles.length}{" "}
              </p>
            </div>
            <div className="flex flex-col justify-center mb-4 space-y-4">
              <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
                <FontAwesomeIcon
                  icon={faChessKing}
                  className="text-white text-4xl"
                />
                <div>
                  <p className="text-md font-semibold">
                    {currentPuzzle?.players.white.user}
                  </p>
                  <p className="text-sm text-gray-400">
                    Rating: {currentPuzzle?.players.white.rating}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg">
                <FontAwesomeIcon
                  icon={faChessQueen}
                  className="text-black text-4xl"
                />
                <div>
                  <p className="text-md font-semibold">
                    {currentPuzzle?.players.black.user}
                  </p>
                  <p className="text-sm text-gray-400">
                    Rating: {currentPuzzle?.players.black.rating}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 text-2xl"
                />
                <p className="text-center">
                  {currentPuzzle?.evaluation.judgment.comment}
                </p>
              </div> */}
            <button
              onClick={moveToNextPuzzle}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
              Next
            </button>
            <div className="flex flex-col items-center mt-4">
              <FontAwesomeIcon
                icon={faChessRook}
                className="text-white text-2xl mb-2"
              />
              <br />
              <div className="grid grid-cols-5 gap-2">
                {puzzles.map((_, index) => (
                  <div key={index} className="flex items-center">
                    <FontAwesomeIcon
                      icon={index % 2 === 0 ? faCircleCheck : faCircleXmark}
                      className={`mr-2 ${
                        index % 2 === 0 ? "text-green-500" : "text-red-500"
                      } text-2xl`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
