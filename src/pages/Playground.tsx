import React, { useState, useCallback, useEffect, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import { BOARD_DIMENSIONS, INITIAL_MATERIAL } from "../constants";
import { getMaterialDiff, getSquarePosition } from "../utils/chess";
import {
  attemptMove,
  checkKnownOpening,
  isPositiveClassification,
  isNotUserTurn,
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
import PlayerWithMaterial from "../features/Board/components/PlayerWithMaterial";
import { PuzzleContext } from "../context/Puzzle/context";
import { useEngineContext } from "../context/Engine/Provider";
import EngineSwitcher from "../features/ControlPanel/components/EngineSwitcher";

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
  const [material, setMaterial] = useState<Materials>(INITIAL_MATERIAL);
  const [sourceSquare, setSourceSquare] = useState<Move["from"] | "">("");
  const [completeVariation, setCompleteVariation] = useState<string[]>([]);
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );
  const [moveSquares, setMoveSquares] = useState({});
  const [markerPosition, setMarkerPosition] = useState<{
    right: number;
    top: number;
  }>({ right: 0, top: 0 });

  const { boardSize, boardRef, resizeRef, handleMouseDown } = useResizableBoard(
    BOARD_DIMENSIONS.INITIAL_SIZE,
    BOARD_DIMENSIONS.MIN_SIZE,
    BOARD_DIMENSIONS.MAX_SIZE
  );

  const { puzzleIndex, fen, setFen, nextPuzzle, prevPuzzle, sessionStarted } =
    useChangePuzzle(
      puzzles,
      setUndoneMoves,
      setDestinationSquare,
      setSourceSquare
    );

  const { engine } = useEngineContext();

  const { puzzle, setPuzzle } = useContext(PuzzleContext);

  useEffect(() => {
    setMaterial(getMaterialDiff(game));
  }, [game.fen()]);

  useEffect(() => {
    if (destinationSquare) {
      const { right, top } = getSquarePosition(
        destinationSquare,
        boardSize,
        puzzle?.userMove.color === "w" ? "white" : "black"
      );
      setMarkerPosition({ right, top });
    }
  }, [destinationSquare, boardSize]);

  useEffect(() => {
    return () => {
      setDestinationSquare("");
      setSolved(false);
    };
  }, []);

  const executeComputerMove = (game: Chess, move: string) => {
    setTimeout(() => {
      const moveObj = game.move(move);
      playSound(game, moveObj);
      setGame(game);
      setFen(game.fen());
    }, 500);
  };

  useEffect(() => {
    setPuzzle(puzzles[puzzleIndex.x]?.[puzzleIndex.y] || null);

    if (puzzle) {
      setGameFen(game, puzzle.fen.previous);
      if (puzzle.opponentMove?.lan) {
        executeComputerMove(game, puzzle.opponentMove.lan);
      }
    }
  }, [puzzleIndex, puzzles, setFen]);

  const unhighlightSquares = useCallback(() => {
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
    if (checkKnownOpening(game.fen().split(" ")[0])) {
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

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    if (isPuzzleSolved) return false;

    if (isNotUserTurn(game, puzzle)) {
      return false;
    }

    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    if (!movePlayedByUser) return false;

    setSourceSquare(sourceSquare as Square);
    setDestinationSquare(targetSquare as Square);
    setUndoneMoves([]);
    const bookMove = handleKnownOpening(movePlayedByUser);

    if (!bookMove) {
      evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
        handleEvaluation(
          movePlayedByUser.lan === puzzle?.userMove.lan
            ? (puzzle.evaluation.judgment?.name as Classification)
            : classification,
          movePlayedByUser.to,
          AnalysisSource.Stockfish,
          isPositiveClassification(classification as Classification)
        );

        if (!isPositiveClassification(classification as Classification)) {
          setTimeout(() => {
            undoMove();
            setUndoneMoves([]);
          }, 1000);
        }
      });
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
    setDestinationSquare("");
    setClassification("");
  };

  const redoMove = () => {
    const move = undoneMoves.shift();
    if (move) {
      game.move(move);
      setFen(game.fen());
      setDestinationSquare("");
      setClassification("");
    }
  };

  const handleEvaluation = (
    classificationResult: "" | Classification,
    dstSquare: Square,
    source: Source,
    isPuzzleSolved: boolean
  ) => {
    setClassification(classificationResult);
    setDestinationSquare(dstSquare);
    setSource(source);
    setSolved(isPuzzleSolved);
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
      setSourceSquare(srcSquare);
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }
    handlePieceDrop(sourceSquare!, srcSquare);
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
        }, 500);
      }
    };

    setMoveSquares({});
    setDestinationSquare("");
    playMove(0);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
      <div
        ref={boardRef}
        className="relative flex flex-col justify-center items-center gap-2"
        style={{ maxWidth: `${boardSize}px`, maxHeight: `${boardSize}px` }}
      >
        <div className="flex items-center justify-center gap-2">
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
          animationDuration={10}
          onPieceDrop={handlePieceDrop}
          onPieceDragBegin={unhighlightSquares}
          onPieceDragEnd={unhighlightSquares}
          boardOrientation={puzzle?.userMove.color == "w" ? "white" : "black"}
          boardWidth={boardSize}
          customSquareStyles={getCustomSquareStyles(
            destinationSquare,
            sourceSquare,
            classification,
            moveSquares,
            isLoadingEvaluation
          )}
          arePiecesDraggable={!isPuzzleSolved}
        />
        {destinationSquare && classification && (
          <img
            src={`/images/marker/${classification}.svg`}
            alt=""
            width={boardSize / 16}
            height={boardSize / 16}
            className="absolute"
            style={{ right: markerPosition.right, top: markerPosition.top }}
          />
        )}
        {puzzle && (
          <PlayerWithMaterial
            player={puzzle.players.black}
            color={"b"}
            isWinner={puzzle.winner === "black"}
            material={material}
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
          isPuzzleSolved={isPuzzleSolved}
          setClassification={setClassification}
          playAllMovesInVariation={playAllMovesInVariation}
        />
        <EngineSwitcher />
      </div>
    </div>
  );
};

export default Playground;
