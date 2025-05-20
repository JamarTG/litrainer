import { FC, useState } from "react";
import { Chess } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { useComputerMove } from "../hooks/useComputerMove";
import useChangePuzzle from "../hooks/useChangePuzzle";
import InteractiveChessBoard from "../components/board/InteractiveBoard";
import PuzzleControlPanel from "../components/controlPanel/ControlPanel";
import SubmitButtonWithModal from "../components/form/SubmitButtomWithModal";
import ThemeChanger from "../components/ThemeChanger";
import NoGamesFound from "../components/controlPanel/NoGamesFound";
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
