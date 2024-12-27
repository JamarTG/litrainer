import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { useEngine } from "../engine/hooks/useEngine";
import { EngineName } from "../types/engine";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import { BOARD_DIMENSIONS } from "../constants";
import { attemptMove } from "../utils/chess";
import {
  Classification,
  ClassificationColors,
  MoveClassification,
} from "../types/move";
import PuzzleControlPanel from "../features/ControlPanel/components/ControlPanel";
import ResizeHandle from "../features/Board/components/ResizeHandle";
import useChangePuzzle from "../features/ControlPanel/hooks/useChangePuzzle";
import useResizableBoard from "../features/Board/hooks/useResizableBoard";
import { openings } from "../data/openings";
import { Source } from "../utils/source";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [source, setSource] = useState<
    "LichessApi" | "Stockfish" | "Local" | null
  >(null);
  const [moveClassification, setMoveClassification] = useState<
    Classification | ""
  >("");
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [clickSourceSquare, setClickSourceSquare] = useState<
    Move["from"] | null
  >(null);
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );
  const [moveSquares, setMoveSquares] = useState({});
  const { boardSize, boardRef, resizeRef, handleMouseDown } = useResizableBoard(
    BOARD_DIMENSIONS.INITIAL_SIZE,
    BOARD_DIMENSIONS.MIN_SIZE,
    BOARD_DIMENSIONS.MAX_SIZE
  );

  const {
    puzzleIndex,
    fen,
    setFen,
    moveToNextPuzzle,
    moveToPreviousPuzzle,
    sessionStarted,
  } = useChangePuzzle(puzzles, setPuzzle);

  const engine = useEngine(EngineName.Stockfish16);

  const getCustomSquareStyles = () => {
    const styles: Record<string, any> = { ...moveSquares };

    if (destinationSquare) {
      styles[destinationSquare] = {
        backgroundImage: `url(images/marker/${moveClassification}.svg)`,
        backgroundColor:
          moveClassification && !isLoadingEvaluation
            ? `${
                ClassificationColors[
                  MoveClassification[
                    moveClassification as keyof typeof MoveClassification
                  ]
                ]
              }`
            : setDestinationSquare(""),
        backgroundSize: "30%",
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat",
      };
    }

    return styles;
  };

  useEffect(() => {
    return () => {
      // Prevents square from being highlighted after the component is unmounted
      setDestinationSquare("");
      setIsPuzzleSolved(false);
    };
  }, []);
  useEffect(() => {
    const executeComputerMove = (game: Chess, move: string) => {
      setTimeout(() => {
        const executedMove = game.move(move);
        playSound(game, executedMove as Move);
        setGame(game);
        setFen(game.fen());
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
    [game, setFen]
  );

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    console.log("isPuzzleSolved", isPuzzleSolved);
    if (isPuzzleSolved) return false;

    if (game.turn() !== puzzle?.userMove.color) {
      return false;
    }

    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    if (!movePlayedByUser) return false;

    const bookMove = checkKnownOpening(game.fen().split(" ")[0]);

    if (bookMove) {
      handleEvaluation(
        MoveClassification.Book,
        movePlayedByUser.to,
        "Local",
        true
      );
      // setTimeout(undoMove, 1000);
    } else {
      const badMove = checkKnownBadMove(movePlayedByUser);
      if (!!badMove) {
        handleEvaluation(
          puzzle.evaluation.judgment?.name as Classification,
          movePlayedByUser.to,
          "LichessApi",
          false
        );
        setTimeout(undoMove, 1000);
      } else {
        evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
          handleEvaluation(
            classification,
            movePlayedByUser.to,
            "Stockfish",
            isPositiveClassification(classification)
          );

          !isPositiveClassification(classification) && setTimeout(undoMove, 1000);
        });
      }
    }

    // Play sound and update the board state
    playSound(game, movePlayedByUser);
    setFen(game.fen());
    setMoveSquares({});

    return true;
  };

  const checkKnownOpening = (fen: string) => {
    const opening = openings.find(
      (opening) => opening.fen === fen.split(" ")[0]
    );

    return !!opening;
  };

  const checkKnownBadMove = (movePlayedByUser: Move) => {
    return movePlayedByUser.lan == puzzle?.userMove.lan
      ? puzzle.evaluation.judgment?.name
      : "";
  };

  const undoMove = () => {
    game.undo();
    setFen(game.fen());
    setDestinationSquare("");
    setMoveClassification("");
  };

  const isPositiveClassification = (classificationResult: Classification) => {
    return (
      classificationResult === MoveClassification.Best ||
      classificationResult === MoveClassification.Excellent ||
      classificationResult === MoveClassification.Good ||
      classificationResult === MoveClassification.Brilliant
    );
  };

  const handleEvaluation = (
    classificationResult: "" | Classification,
    destinationSquare: Square,
    source: Source,
    isPuzzleSolved: boolean
  ) => {
  
    if (classificationResult !== "") {
      setMoveClassification(classificationResult);
      setDestinationSquare(destinationSquare);
      if (isPuzzleSolved) {
        setIsPuzzleSolved(true);
      } 
    } else {
      setMoveClassification("");
    }
    setSource(source);

  };

  const evaluateMoveQuality = async (fen: string, move: Move, depth = 15) => {
    setIsLoadingEvaluation(true);

    try {
      const classificationResult = (await engine?.evaluateMoveQuality(
        fen,
        move.lan,
        depth
      )) as Classification;

      const isSolved = isPositiveClassification(
        classificationResult as Classification
      );
      handleEvaluation(
        classificationResult as Classification,
        move.to,
        "Stockfish",
        isSolved
      );
      return classificationResult;
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  const handleSquareClick = (clickedSquare: Square) => {
    if (isPuzzleSolved) return;
    const clickedPiece = game.get(clickedSquare);
    const isValidFirstClick = !clickSourceSquare && clickedPiece;
    const isSecondClick = clickSourceSquare;

    if (isValidFirstClick) {
      setClickSourceSquare(clickedSquare);

      highlightLegalMoves(
        game.moves({
          square: clickedSquare,
          verbose: true,
        })
      );
    } else if (isSecondClick) {
      if (clickedPiece && clickedPiece.color === game.turn()) {
        setClickSourceSquare(clickedSquare);

        highlightLegalMoves(
          game.moves({
            square: clickedSquare,
            verbose: true,
          })
        );
      } else {
        handlePieceDrop(clickSourceSquare!, clickedSquare);
        unhighlightSquares();
      }
    }
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (isPuzzleSolved) return;

      const highlightedSquaresStyles = legalMoves.reduce((styles, move) => {
        const isCaptureMove = move.captured;

        styles[move.to] = {
          background: `radial-gradient(circle, ${
            isCaptureMove ? "rgba(2,0,0,.2)" : "rgba(0,0,0,.1)"
          } ${isCaptureMove ? "60%" : "30%"}, transparent 25%)`,
          borderRadius: "50%",
          zIndex: 1,
        };
        return styles;
      }, {} as Record<string, any>);

      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
      <div
        ref={boardRef}
        className="relative flex justify-center items-center"
        style={{ maxWidth: `${boardSize}px`, maxHeight: `${boardSize}px` }}
      >
        <Chessboard
          position={fen}
          onSquareClick={handleSquareClick}
          animationDuration={60}
          onPieceDrop={handlePieceDrop}
          onPieceDragBegin={unhighlightSquares}
          onPieceDragEnd={unhighlightSquares}
          boardOrientation={puzzle?.userMove.color == "w" ? "white" : "black"}
          boardWidth={boardSize}
          customSquareStyles={getCustomSquareStyles()}
          // arePiecesDraggable={!isPuzzleSolved}
        />
        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>
      Classification : {moveClassification}
      <PuzzleControlPanel
        game={game}
        puzzle={puzzle}
        setIsPuzzleSolved={setIsPuzzleSolved}
        source={source}
        setMoveClassification={setMoveClassification}
        moveToNextPuzzle={moveToNextPuzzle}
        moveToPreviousPuzzle={moveToPreviousPuzzle}
        sessionStarted={sessionStarted}
        unhighlightLegalMoves={unhighlightSquares}
      />
    </div>
  );
};

export default Playground;
