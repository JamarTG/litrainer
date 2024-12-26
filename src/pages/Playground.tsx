import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { useEngine } from "../engine/hooks/useEngine";
import { EngineName } from "../types/engine";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import { BOARD_DIMENSIONS, moveSquareStyles } from "../constants";
import { attemptMove } from "../utils/chess";
import {
  Classification,
  ClassificationColors,
  MoveClassification,
} from "../types/move";
import PuzzleControlPanel from "../features/ControlPanel/components/ControlPanel";
import ResizeHandle from "../features/Board/components/ResizeHandle";
import useChangePuzzle from "../features/ControlPanel/hooks/useChangePuzzle";
import useResizeableBoard from "../features/Board/hooks/useResizableBoard";
import PlayerInfo from "../features/ControlPanel/components/PlayerInfo";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [moveClassification, setMoveClassification] = useState<
    Classification | ""
  >("");
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [clickSourceSquare, setClickSourceSquare] = useState<string | null>(
    null
  );
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );
  const [moveSquares, setMoveSquares] = useState({});
  const { boardSize, boardRef, resizeRef, handleMouseDown } =
    useResizeableBoard(
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
    } else {
      isLoadingEvaluation
        ? (styles[clickSourceSquare!] = moveSquareStyles)
        : null;
    }

    return styles;
  };

  useEffect(() => {
    return () => {
      // Prevents square from being highlighted after the component is unmounted
      setDestinationSquare("");
    };
  }, []);
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
    setDestinationSquare("")
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
    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    let hasResult = false;

    if (!movePlayedByUser) return false;

    if (movePlayedByUser.lan === puzzle?.userMove.lan) {
    
      setMoveClassification(
        puzzle.evaluation.judgment?.name as "" | Classification
      );
      setDestinationSquare(movePlayedByUser.to);
      setIsLoadingEvaluation(false);
      hasResult = true;
    }
    const evaluateMoveQuality = async (fen: string, move: Move, depth = 20) => {
      setIsLoadingEvaluation(true);
      await engine
        ?.evaluateMoveQuality(fen, move.lan, depth)
        .then((classificationResult) => {
          setMoveClassification(classificationResult ?? "");
          setDestinationSquare(move.to);
        })
        .finally(() => setIsLoadingEvaluation(false));
    };

    // if (!hasResult){
      evaluateMoveQuality(fen, movePlayedByUser);
    // }
   
    playSound(game, movePlayedByUser);
    setFen(game.fen());
    setMoveSquares({});

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
        <div className="flex flex-col">
          <div className="py-2">
            {puzzle && (
              <PlayerInfo
                player={puzzle.players.white}
                color={"w"}
                isWinner={puzzle?.winner == "white"}
              />
            )}
          </div>

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
          />
          <div className="py-2 ">
            {puzzle && (
              <PlayerInfo
                player={puzzle.players.black}
                color={"b"}
                isWinner={puzzle.winner == "black"}
              />
            )}
          </div>
        </div>

        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>

      <PuzzleControlPanel
        game={game}
        puzzle={puzzle}
        setMoveClassification={setMoveClassification}
        moveToNextPuzzle={moveToNextPuzzle}
        unhighlightSquares={unhighlightSquares}
        moveToPreviousPuzzle={moveToPreviousPuzzle}
        sessionStarted={sessionStarted}
      />
    </div>
  );
};

export default Playground;
