import React, { useState, useCallback } from "react";
import { Chess, Move, Square } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { getHighlightedLegalMoves } from "../utils/style";
import { useComputerMove } from "../hooks/useComputerMove";
import useChangePuzzle from "../hooks/useChangePuzzle";
import InteractiveChessBoard from "../components/Board/InteractiveBoard";
import PuzzleControlPanel from "../components/ControlPanel/ControlPanel";
import SubmitButtonWithModal from "../components/Form/SubmitButtomWithModal";
import ThemeChanger from "../components/ThemeChanger";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import NoGamesFound from "../components/ControlPanel/NoGamesFound";
import usePuzzleSetup from "../hooks/usePuzzleSetup";
import useInitPuzzles from "../hooks/useInitPuzzles";

import { setMoveSquares, setSourceSquare } from "./redux/slices/boardSlices";
import { useMoveHandler } from "../hooks/useMovehandler";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: React.FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const [game, setGame] = useState<Chess>(new Chess());

  const isPuzzleSolved = useSelector((state: RootState) => state.feedback.isPuzzleSolved);
  const sourceSquare = useSelector((state: RootState) => state.board.sourceSquare);

  const { executeComputerMove } = useComputerMove(setGame);

  const dispatch = useDispatch();

  useChangePuzzle();
  usePuzzleSetup(executeComputerMove, game);

  const { handleMoveAttempt } = useMoveHandler({
    game,
    engine: null
  });

  const unhighlightLegalMoves = useCallback(() => {
    dispatch(setMoveSquares({}));
  }, []);

  const handleSquareClick = (srcSquare: Square) => {
    if (isPuzzleSolved) return;
    const piece = game.get(srcSquare);

    if (!!piece && piece.color === game.turn()) {
      setSourceSquare(srcSquare);
      highlightLegalMoves(game.moves({ square: srcSquare, verbose: true }));
      return;
    }
    handleMoveAttempt(sourceSquare!, srcSquare);
    unhighlightLegalMoves();
  };

  const highlightLegalMoves = useCallback(
    (legalMoves: Move[]) => {
      if (isPuzzleSolved) return;
      const highlightedSquaresStyles = getHighlightedLegalMoves(legalMoves);
      setMoveSquares(highlightedSquaresStyles);
    },
    [setMoveSquares]
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center min-h-screen gap-1 items-center p-4">
      <InteractiveChessBoard
        game={game}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />

      {puzzles.length !== 0 ? (
        <div className={`w-full md:w-[400px]`}>
          <div className="mb-5 flex gap-8 justify-center items-center">
            <SubmitButtonWithModal />
            <ThemeChanger />
          </div>
          <PuzzleControlPanel unhighlightLegalMoves={unhighlightLegalMoves} />
        </div>
      ) : (
        <NoGamesFound />
      )}
    </div>
  );
};

export default Playground;
