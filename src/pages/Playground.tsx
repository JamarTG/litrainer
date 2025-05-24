import { FC, useState } from "react";
import { Chess } from "chess.js";
import { Puzzle } from "../types/puzzle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useComputerMove } from "../hooks/useComputerMove";
import useChangePuzzle from "../hooks/useChangePuzzle";
import InteractiveChessBoard from "../components/playArea/board/InteractiveBoard";
import usePuzzleSetup from "../hooks/usePuzzleSetup";
import useInitPuzzles from "../hooks/useInitPuzzles";
import { useMoveHandler } from "../hooks/useMoveHandler";
import { useSquareClickHandler } from "../hooks/useSquareClickHandler";
import PuzzleInfo from "../components/panel/PuzzleInfo";
import PieceSetChooser from "../components/panel/PieceSetChooser";
import BoardThemeChooser from "../components/panel/BoardThemeChooser";
import { toggleTheme } from "../redux/slices/themeSlices";
import useUpdateTheme from "../hooks/useUpdateTheme";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import SubmitButtonWithModal from "../components/trainerForm/SubmitButtonWithModal";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const [game, setGame] = useState<Chess>(new Chess());
  const { executeComputerMove } = useComputerMove(setGame);

  useChangePuzzle();
  usePuzzleSetup(executeComputerMove, game);

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useUpdateTheme(theme);

  const { handleMoveAttempt } = useMoveHandler(game);
  const { handleSquareClick, unhighlightLegalMoves } = useSquareClickHandler(game);

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex gap-6 justify-center items-center flex-wrap min-[850px]:flex-nowrap">
      <InteractiveChessBoard
        game={game}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />

      <div className="relative flex flex-col gap-4 w-full bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg min-h-[500px]">
        {!showSettings && (
          <div className="space-y-4 ">
            <div className="h-8 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Controls</h2>
              <div className="flex justify-center items-center rounded-full ">
                <SubmitButtonWithModal />
                <button
                  aria-label="Settings"
                  onClick={() => setShowSettings(true)}
                  className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
                >
                  <FaGear size={20} />
                </button>
              </div>
            </div>
            <PuzzleInfo />
          </div>
        )}

        {showSettings && (
          <div className="absolute inset-0 z-10 bg-gray-100 dark:bg-zinc-800 p-4 flex flex-col gap-4 animate-fade-in">
            <div className="h-8 flex items-center justify-between">
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Back</h2>
              </button>
              <button
                title="light or dark?"
                className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
                onClick={() => dispatch(toggleTheme())}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <PieceSetChooser />
              <BoardThemeChooser />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
