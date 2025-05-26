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
import AutoSkip from "../components/panel/AutoSkip";
import TrainerForm from "../components/trainerForm/modals/TrainerForm";
import { initialFormState } from "../constants/form";
import { Fields } from "../types/form";
import useHandleSubmit from "../hooks/useHandleSubmit";
import GameInfo from "../components/playArea/header/GameInfo";
import { IoIosArrowBack } from "react-icons/io";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const [formData, setFormData] = useState<Fields>(initialFormState);

  const handleSubmit = useHandleSubmit(formData);

  if (puzzles.length === 0) {
    return (
      <TrainerForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="flex gap-6 justify-center items-center flex-wrap min-[1000px]:flex-nowrap md:mx-2 lg:mx-4">
      <InteractiveChessBoard
        game={game}
        handleSquareClick={handleSquareClick}
        handleMoveAttempt={handleMoveAttempt}
        unhighlightLegalMoves={unhighlightLegalMoves}
      />
      <div className="flex flex-col gap-4 w-full bg-gray-100 min-w-[250px] dark:bg-[#222] border dark:border-gray-700 p-4 rounded-sm min-h-[500px]">
        {!showSettings && (
          <div className="space-y-4 ">
            <div className="relative h-8 flex items-center justify-end">
              <GameInfo />
              <SubmitButtonWithModal />
              <button
                aria-label="Settings"
                title="Settings"
                onClick={() => setShowSettings(true)}
                className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
              >
                <FaGear size={25} />
              </button>
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
                <IoIosArrowBack size={25} />
              </button>
              <button
                title="light or dark?"
                className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
                onClick={() => dispatch(toggleTheme())}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <FaSun size={25} /> : <FaMoon size={25} />}
              </button>
            </div>
            <div className="min-w-96 flex justify-center items-center flex-col gap-4 mt-6">
              <div className="flex w-96 flex-col items-start justify-start">
                <AutoSkip />
                <PieceSetChooser />
                <BoardThemeChooser />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
