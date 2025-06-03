import { FC, useEffect, useState } from "react";
import { Puzzle } from "@/types/puzzle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import InteractiveChessBoard from "@/components/board/InteractiveBoard";
import usePuzzleSetup from "@/hooks/usePuzzleSetup";
import useInitPuzzles from "@/hooks/useInitPuzzles";
import { useMoveHandler } from "@/hooks/useMoveHandler";
import PuzzleInfo from "@/components/panel/PuzzleInfo";
import PieceSetChooser from "@/components/panel/PieceSetChooser";
import BoardThemeChooser from "@/components/panel/BoardThemeChooser";
import { toggleTheme } from "@/redux/slices/theme";
import useUpdateTheme from "@/hooks/useUpdateTheme";
import { Moon, Sun, Settings, ArrowBigLeftDash } from "lucide-react";
import AutoSkip from "@/components/panel/AutoSkip";
import { initialFormState } from "@/constants/form";
import { Fields } from "@/types/form";
import useHandleSubmit from "@/hooks/useHandleSubmit";
import TrainerForm from "@/components/form/modals/TrainerForm";
import SubmitButtonWithModal from "@/components/form/SubmitButtonWithModal";
import GameInfo from "@/components/board/header/GameInfo";
import EngineDepthControl from "@/components/panel/EngineDepthControl";
import WebsiteLoader from "@/components/common/WebsiteLoader";
// import
interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const { game } = usePuzzleSetup();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useUpdateTheme(theme);

  const { handleMoveAttempt } = useMoveHandler(game);

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

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return <WebsiteLoader />;
  }

  return (
    <div className="flex gap-6 justify-center items-center flex-wrap h-full min-[1000px]:flex-nowrap md:mx-2 lg:mx-4">
      <InteractiveChessBoard game={game} handleMoveAttempt={handleMoveAttempt} />
      <div
        className=" bg-zinc-300 
  flex flex-col gap-4 w-full min-w-[250px] min-h-[500px] p-4 rounded-sm shadow-xs border border-gray-400
  dark:bg-[#222] dark:border-gray-700
"
      >
        {!showSettings && (
          <>
            <div className="relative bh-12 flex items-center justify-end">
              <GameInfo />
              <SubmitButtonWithModal />
              <button
                aria-label="Settings"
                title="Settings"
                onClick={() => setShowSettings(true)}
                className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
              >
                <Settings size={25} />
              </button>
            </div>
            <PuzzleInfo />
          </>
        )}

        {showSettings && (
          <div
            style={{ zIndex: 100 }}
            className="absolute inset-0 bg-[#e7e3e3] dark:bg-zinc-900 p-4 flex flex-col gap-4 animate-fade-in h-screen"
          >
            <div className="h-8 flex items-center justify-between">
              <button
                onClick={() => setShowSettings(false)}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <ArrowBigLeftDash size={25} />
              </button>
              <button
                title="light or dark?"
                className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
                onClick={() => dispatch(toggleTheme())}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Sun size={25} /> : <Moon size={25} />}
              </button>
            </div>
            <div className="flex h-full justify-center items-center">
              <div className="w-full max-w-md h-96 flex justify-center items-center  dark:border-zinc-600 rounded-md flex-col gap-4 mt-6">
                <div className="flex flex-col justify-center items-center  rounded-md p-4 gap-5">
                  <div className="flex w-72 justify-start items-center">
                    <AutoSkip />
                  </div>
                  <div className="flex w-72 justify-start items-center">
                    <PieceSetChooser />
                  </div>
                  <div className="flex w-72 justify-start items-center">
                    <BoardThemeChooser />
                  </div>
                  <div className="flex w-72 justify-start items-center">
                    <EngineDepthControl />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
