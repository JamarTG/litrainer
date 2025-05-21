import { FC, useState } from "react";
import { Chess } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { useComputerMove } from "../hooks/useComputerMove";
import useChangePuzzle from "../hooks/useChangePuzzle";
import InteractiveChessBoard from "../components/playArea/board/InteractiveBoard";
import usePuzzleSetup from "../hooks/usePuzzleSetup";
import useInitPuzzles from "../hooks/useInitPuzzles";
import { useMoveHandler } from "../hooks/useMoveHandler";
import { useSquareClickHandler } from "../hooks/useSquareClickHandler";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const [game, setGame] = useState<Chess>(new Chess());
  const { executeComputerMove } = useComputerMove(setGame);

  useChangePuzzle();
  usePuzzleSetup(executeComputerMove, game);

  const { handleMoveAttempt } = useMoveHandler(game);

  const { handleSquareClick, unhighlightLegalMoves } = useSquareClickHandler(game);

  return (
    <div className="flex flex-col justify-center items-center">
      <InteractiveChessBoard
        game={game}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />

      {/* <div className="w-full flex justify-center items-center">
        {puzzles.length !== 0 ? (
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <div className="gap-4">
              <SubmitButtonWithModal />
              <ThemeChanger />
            </div>
            <PuzzleControlPanel unhighlightLegalMoves={unhighlightLegalMoves} />
          </div>
        ) : (
          <NoGamesFound />
        )}
      </div> */}
    </div>
  );
};

export default Playground;
