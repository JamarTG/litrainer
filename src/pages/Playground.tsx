import React, { useState, useCallback, useEffect, useContext } from "react";
import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { playSound } from "../utils/sound";
import {
  attemptMove,
  checkKnownOpening,
  isPositiveClassification,
  isNotUserTurn,
} from "../utils/chess";
import { Classification, MoveClassification } from "../types/move";
import PuzzleControlPanel from "../features/ControlPanel/components/ControlPanel";
import useChangePuzzle from "../features/ControlPanel/hooks/useChangePuzzle";
import { getHighlightedLegalMoves } from "../utils/style";
import { PuzzleContext } from "../context/Puzzle/PuzzleContext";
import { useComputerMove } from "../features/Engine/hooks/useComputerMove";
import { useEngineContext } from "../context/Engine/EngineContext";

import Settings from "../features/Settings/components/Settings";
import SubmitButtonWithModal from "../features/Form/components/SubmitButtomWithModal";
import InteractiveChessBoard from "../features/Board/components/InteractiveBoard";

interface PlayGroundProps {
  puzzles: Puzzle[][];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [classification, setClassification] = useState<Classification | "">("");
  const [solved, setSolved] = useState<boolean | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] =
    useState<boolean>(false);

  const [sourceSquare, setSourceSquare] = useState<Move["from"] | "">("");
  const [destinationSquare, setDestinationSquare] = useState<Move["to"] | "">(
    ""
  );

  const [moveSquares, setMoveSquares] = useState({});

  const { puzzleIndex, fen, setFen, nextPuzzle, prevPuzzle, sessionStarted } =
    useChangePuzzle(puzzles, setDestinationSquare, setSourceSquare);

  const { engine } = useEngineContext();
  const { puzzle, setPuzzle } = useContext(PuzzleContext);
  const { executeComputerMove } = useComputerMove(setGame, setFen);

  useEffect(() => {
    return () => {
      setDestinationSquare("");
      setSolved(null);
    };
  }, []);

  useEffect(() => {
    const currentPuzzle = puzzles[puzzleIndex.x]?.[puzzleIndex.y];
    if (!currentPuzzle) return;

    setPuzzle(currentPuzzle);
    game.load(fen);
    setFen(currentPuzzle.fen.previous);

    if (currentPuzzle.opponentMove?.lan) {
      executeComputerMove(game, currentPuzzle.opponentMove.lan);
    }
  }, [puzzleIndex, puzzles, setFen]);

  const unhighlightLegalMoves = useCallback(() => {
    setMoveSquares({});
  }, []);

  const isInOpeningBook = (movePlayedByUser: Move) => {
    const fenPosition = game.fen().split(" ")[0];
    const isMoveAccepted = true;

    if (checkKnownOpening(fenPosition)) {
      handleEvaluation(MoveClassification.Book, movePlayedByUser.to, isMoveAccepted);
      return true;
    }

    return false;
  };

  const makeMove = (sourceSquare: string, targetSquare: string) => {
    if (solved) return false;

    if (isNotUserTurn(game, puzzle)) {
      return false;
    }

    const movePlayedByUser = attemptMove(game, sourceSquare, targetSquare);
    const isMoveInvalid = !movePlayedByUser;

    if (isMoveInvalid) return false;

    setSourceSquare(sourceSquare as Square);
    setDestinationSquare(targetSquare as Square);

    if (!isInOpeningBook(movePlayedByUser)) {
      evaluateMoveQuality(fen, movePlayedByUser).then((classification) => {
        const isSameMistake = movePlayedByUser.lan === puzzle?.userMove.lan;
        const sameJudgement = puzzle?.evaluation.judgment?.name;
        
        handleEvaluation(
          isSameMistake
            ? (sameJudgement as Classification)
            : classification,
          movePlayedByUser.to,
          isPositiveClassification(classification as Classification)
        );
      });
    }

    playSound(game, movePlayedByUser);
    setFen(game.fen());
    setMoveSquares({});

    return true;
  };

  const handleEvaluation = (
    classificationResult: "" | Classification,
    dstSquare: Square,
    solved: boolean
  ) => {
    setClassification(classificationResult);
    setDestinationSquare(dstSquare);
    setSolved(solved);
  };

  const evaluateMoveQuality = async (fen: string, move: Move, depth = 15) => {
    setIsLoadingEvaluation(true);
    try {
      if (!engine?.isReady()) {
        throw new Error("Engine is not initialized");
      }

      const result = await engine.evaluateMoveQuality(fen, move.lan, depth);
      handleEvaluation(
        result.classification,
        move.to,
        isPositiveClassification(result.classification)
      );

      return result.classification ?? "";
    } catch (error) {
      console.error("Error evaluating move quality:", error);
      return "";
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  const handleSquareClick = (srcSquare: Square) => {
    if (solved) return;
    const piece = game.get(srcSquare);

    if (!!piece && piece.color === game.turn()) {
      setSourceSquare(srcSquare);
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }
    makeMove(sourceSquare!, srcSquare);
    unhighlightLegalMoves();
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (solved) return;
      
      const highlightedSquaresStyles = getHighlightedLegalMoves(legalMoves);

      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  return (
    <div className="bg-gray-700 text-white flex flex-col md:flex-row justify-center min-h-screen p-4 gap-3 items-center">
      <InteractiveChessBoard
        game={game}
        puzzle={puzzle}
        destinationSquare={destinationSquare}
        sourceSquare={sourceSquare}
        classification={classification}
        moveSquares={moveSquares}
        isLoadingEvaluation={isLoadingEvaluation}
        solved={solved}
        fen={fen}
        handleSquareClick={handleSquareClick}
        makeMove={makeMove}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <Settings />
        <PuzzleControlPanel
          nextPuzzle={nextPuzzle}
          prevPuzzle={prevPuzzle}
          unhighlightLegalMoves={unhighlightLegalMoves}
          setSolved={setSolved}
          setClassification={setClassification}
          sessionStarted={sessionStarted}
        />
        <SubmitButtonWithModal text="New Session" />
      </div>
    </div>
  );
};

export default Playground;