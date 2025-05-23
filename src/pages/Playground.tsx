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
import PuzzleControlPanel from "../components/panel/ControlPanel";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const [game, setGame] = useState<Chess>(new Chess());
  const { executeComputerMove } = useComputerMove(setGame);

  useChangePuzzle();
  usePuzzleSetup(executeComputerMove, game);

  const { handleMoveAttempt2 } = useMoveHandler(game);

  const { handleSquareClick, unhighlightLegalMoves } = useSquareClickHandler(game);

  return (
    <div className="flex h-screen justify-center gap-5 items-start p-5 flex-wrap min-[824px]:flex-nowrap">
      {/* <div className="hidden min-[1350px]:block">
        <GameInfo />
        <EngineDepthControl/>
      </div> */}

      <InteractiveChessBoard
        game={game}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt2}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />

      <div className="w-full min-[768px]:w-[400px]">
        <PuzzleControlPanel />
      </div>
    </div>
  );
};

export default Playground;
