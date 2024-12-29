import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { useEngine } from "../engine/hooks/useEngine";
import { EngineName } from "../types/engine";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import { BOARD_DIMENSIONS } from "../constants";
import {
  attemptMove,
  checkKnownBadMove,
  checkKnownOpening,
  isPositiveClassification,
} from "../utils/chess";
import { Classification, MoveClassification } from "../types/move";
import PuzzleControlPanel from "../features/ControlPanel/components/ControlPanel";
import ResizeHandle from "../features/Board/components/ResizeHandle";
import useChangePuzzle from "../features/ControlPanel/hooks/useChangePuzzle";
import useResizableBoard from "../features/Board/hooks/useResizableBoard";
import { AnalysisSource, Source } from "../types/eval";
import { getCustomSquareStyles, getSquareStyle } from "../utils/style";
import PlayerInfo from "../features/ControlPanel/components/PlayerInfo";
import MoveList from "../features/MoveList/MoveList";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [undoneMoves, setUndoneMoves] = useState<string[]>([]);
  const [source, setSource] = useState<Source>(null);
  const [classification, setClassification] = useState<Classification | "">("");
  const [isPuzzleSolved, setSolved] = useState<boolean>(false);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [clickSourceSquare, setClickSourceSquare] = useState<
    Move["from"] | null
  >(null);
  const [completeVariation, setCompleteVariation] = useState<string[]>([]);
  const [dstSquare, setDstSquare] = useState<Move["to"] | "">("");
  const [moveSquares, setMoveSquares] = useState({});

  const { boardSize, boardRef, resizeRef, handleMouseDown } = useResizableBoard(
    BOARD_DIMENSIONS.INITIAL_SIZE,
    BOARD_DIMENSIONS.MIN_SIZE,
    BOARD_DIMENSIONS.MAX_SIZE
  );

  const { puzzleIndex, fen, setFen, nextPuzzle, prevPuzzle, sessionStarted } =
    useChangePuzzle(puzzles, setPuzzle, setUndoneMoves);

  const engine = useEngine(EngineName.Stockfish16_1);

  useEffect(() => {
    return () => {
      // Prevents square from being highlighted after the component is unmounted
      setDstSquare("");
      setSolved(false);
    };
  }, []);

  const executeComputerMove = (game: Chess, move: string) => {
    setTimeout(() => {
      const executedMove = game.move(move);
      playSound(game, executedMove as Move);
      setGame(game);
      setFen(game.fen());
    }, 500);
  };

  useEffect(() => {
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

  const handleKnownOpening = (movePlayedByUser: Move) => {
    const bookMove = checkKnownOpening(game.fen().split(" ")[0]);
    if (bookMove) {
      handleEvaluation(
        MoveClassification.Book,
        movePlayedByUser.to,
        AnalysisSource.Opening,
        true
      );
      return true;
    }
    return false;
  };

  const handleKnownBadMove = (movePlayedByUser: Move) => {
    const badMove = puzzle
      ? checkKnownBadMove(movePlayedByUser, puzzle)
      : false;
    if (badMove) {
      if (puzzle) {
        handleEvaluation(
          puzzle.evaluation.judgment?.name as Classification,
          movePlayedByUser.to,
          AnalysisSource.LichessAPI,
          false
        );
      }
      setTimeout(undoMove, 1000);
      return true;
    }
    return false;
  };

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    if (isPuzzleSolved) return false;

    if (game.turn() !== puzzle?.userMove.color) {
      return false;
    }

    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    if (!movePlayedByUser) return false;

    setUndoneMoves([]);
    const bookMove = handleKnownOpening(movePlayedByUser);

    if (!bookMove) {
      const badMove = handleKnownBadMove(movePlayedByUser);

      if (!badMove && !bookMove) {
        evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
          handleEvaluation(
            classification,
            movePlayedByUser.to,
            AnalysisSource.Stockfish,
            isPositiveClassification(classification as Classification)
          );

          !isPositiveClassification(classification as Classification) &&
            setTimeout(() => {
              undoMove();
              setUndoneMoves([]);
            }, 1000);
        });
      }
    }

    // Play sound and update the board state
    playSound(game, movePlayedByUser);
    setFen(game.fen());
    setMoveSquares({});

    return true;
  };

  const undoMove = () => {
    if (game.history().length < 3) return;
    const a = game.undo();
    setUndoneMoves([a?.san || "", ...undoneMoves]);
    setFen(game.fen());
    setDstSquare("");
    setClassification("");
  };

  const redoMove = () => {
    const move = undoneMoves.shift();
    if (move) {
      game.move(move);
      setFen(game.fen());
      setDstSquare("");
      setClassification("");
    }
  };

  const handleEvaluation = (
    classificationResult: "" | Classification,
    dstSquare: Square,
    source: Source,
    isPuzzleSolved: boolean
  ) => {
    if (classificationResult !== "") {
      setClassification(classificationResult);
      setDstSquare(dstSquare);
      if (isPuzzleSolved) {
        setSolved(true);
      }
    } else {
      setClassification("");
    }
    setSource(source);
  };

  const evaluateMoveQuality = async (fen: string, move: Move, depth = 15) => {
    setIsLoadingEvaluation(true);

    try {
      const result = await engine?.evaluateMoveQuality(fen, move.lan, depth);
      if (result) {
        const { classification, variation } = result;
        handleEvaluation(
          classification,
          move.to,
          AnalysisSource.Stockfish,
          isPositiveClassification(classification)
        );
        setCompleteVariation(variation);
        return classification;
      }
      return "";
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  const handleSquareClick = (srcSquare: Square) => {
    if (isPuzzleSolved) return;
    const piece = game.get(srcSquare);

    if (!!piece && piece.color === game.turn()) {
      setClickSourceSquare(srcSquare);
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }
    handlePieceDrop(clickSourceSquare!, srcSquare);
    unhighlightSquares();
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (isPuzzleSolved) return;

      const highlightedSquaresStyles = legalMoves.reduce((styles, move) => {
        styles[move.to] = getSquareStyle(!!move.captured);
        return styles;
      }, {} as Record<string, any>);

      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  const playAllMovesInVariation = () => {
    const playMove = (index: number) => {
      if (index < completeVariation.length) {
        const nextMove = completeVariation[index];
        setTimeout(() => {
          executeComputerMove(game, nextMove);
          playMove(index + 1);
        }, 500); // Adjust the delay as needed
      }
    };

    setMoveSquares({});
    setDstSquare("");
    playMove(0);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
      <div
        ref={boardRef}
        className="relative flex flex-col justify-center gap-2"
        style={{ maxWidth: `${boardSize}px`, maxHeight: `${boardSize}px` }}
      >
        {puzzle?.players.white && (
          <PlayerInfo
            player={puzzle.players.white}
            color={"w"}
            isWinner={puzzle.winner === "white"}
          />
        )}

        <Chessboard
          position={fen}
          onSquareClick={handleSquareClick}
          animationDuration={60}
          onPieceDrop={handlePieceDrop}
          onPieceDragBegin={unhighlightSquares}
          onPieceDragEnd={unhighlightSquares}
          boardOrientation={puzzle?.userMove.color == "w" ? "white" : "black"}
          boardWidth={boardSize}
          customSquareStyles={getCustomSquareStyles(
            dstSquare,
            classification,
            moveSquares,
            isLoadingEvaluation
          )}
          arePiecesDraggable={!isPuzzleSolved}
        />
        {puzzle?.players.black && (
          <PlayerInfo
            player={puzzle.players.black}
            color={"b"}
            isWinner={puzzle.winner === "black"}
          />
        )}

        <ResizeHandle resizeRef={resizeRef} handleMouseDown={handleMouseDown} />
      </div>
      <div className="flex flex-col">
        <MoveList
          undoneMoves={undoneMoves}
          history={game.history({ verbose: true }).map((move) => move.san)}
          redoMove={redoMove}
          undoMove={undoMove}
        />
        <PuzzleControlPanel
          game={game}
          puzzle={puzzle}
          source={source}
          nextPuzzle={nextPuzzle}
          prevPuzzle={prevPuzzle}
          sessionStarted={sessionStarted}
          unhighlightLegalMoves={unhighlightSquares}
          setSolved={setSolved}
          setClassification={setClassification}
          playAllMovesInVariation={playAllMovesInVariation}
        />
      </div>
    </div>
  );
};

export default Playground;
