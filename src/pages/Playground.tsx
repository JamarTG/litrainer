import React, { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { useEngine } from "../engine/hooks/useEngine";
import { EngineName } from "../types/engine";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import { BOARD_DIMENSIONS } from "../constants";
import { PIECEVALUE } from "../constants";
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
import { AnalysisSource, Materials, Source } from "../types/eval";
import { getCustomSquareStyles, getSquareStyle } from "../utils/style";
import PlayerInfo from "../features/ControlPanel/components/PlayerInfo";
import MoveList from "../features/MoveList/MoveList";
import RenderMaterial from "../features/ControlPanel/components/RenderMaterial";

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
  const [material, setMaterial] = useState<Materials>({
    w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
  });
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

  const engine = useEngine(EngineName.Stockfish16_1Lite);

  useEffect(() => {
    const { whiteMaterial, blackMaterial } = getMaterialDiff(game);
    setMaterial({ w: whiteMaterial, b: blackMaterial });
  }, [game.fen()]);

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

  const getMaterialDiff = (game: Chess) => {
    // Define the Material interface
    interface Material {
      w: {
        p: number; // Pawns
        n: number; // Knights
        b: number; // Bishops
        r: number; // Rooks
        q: number; // Queens
      };
      b: {
        p: number; // Pawns
        n: number; // Knights
        b: number; // Bishops
        r: number; // Rooks
        q: number; // Queens
      };
    }

    // Initialize the material counts
    let material: Material = {
      w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    };

    // Populate the material counts
    for (const row of game.board()) {
      for (const square of row) {
        if (square) {
          if (square.color === "w") {
            material.w[square.type as keyof typeof material.w]++;
          }
          if (square.color === "b") {
            material.b[square.type as keyof typeof material.b]++;
          }
        }
      }

      // Calculate material difference
      let materialDiff = 0;
      for (const pieceType of ["p", "n", "b", "r", "q"] as const) {
        materialDiff +=
          (material.w[pieceType] - material.b[pieceType]) *
          PIECEVALUE[pieceType];
      }
    }

    const whiteMaterial = {
      p: Math.max(material.w.p - material.b.p, 0),
      n: Math.max(material.w.n - material.b.n, 0),
      b: Math.max(material.w.b - material.b.b, 0),
      r: Math.max(material.w.r - material.b.r, 0),
      q: Math.max(material.w.q - material.b.q, 0),
    };

    const blackMaterial = {
      p: Math.max(material.b.p - material.w.p, 0),
      n: Math.max(material.b.n - material.w.n, 0),
      b: Math.max(material.b.b - material.w.b, 0),
      r: Math.max(material.b.r - material.w.r, 0),
      q: Math.max(material.b.q - material.w.q, 0),
    };

    return { whiteMaterial, blackMaterial };
  };

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
        <div className="flex justify-center items-center gap-2">
          {puzzle?.players.white && (
            <PlayerInfo
              player={puzzle.players.white}
              color={"w"}
              isWinner={puzzle.winner === "white"}
            />
          )}
          <RenderMaterial material={material} color="w" />
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
          customSquareStyles={getCustomSquareStyles(
            dstSquare,
            classification,
            moveSquares,
            isLoadingEvaluation
          )}
          arePiecesDraggable={!isPuzzleSolved}
        />

        <div className="flex justify-center items-center gap-2">
          {puzzle?.players.black && (
            <PlayerInfo
              player={puzzle.players.black}
              color={"b"}
              isWinner={puzzle.winner === "black"}
            />
          )}

          <RenderMaterial material={material} color="b" />
        </div>

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
