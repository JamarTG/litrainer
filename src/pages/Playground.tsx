import { FC, useEffect, useState } from "react";
import { Fields, Puzzle } from "@/types/lichess";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import InteractiveChessBoard from "@/components/board/_index";
import usePuzzleSetup from "@/hooks/usePuzzleSetup";
import useInitPuzzles from "@/hooks/useInitPuzzles";
import { useMoveHandler } from "@/hooks/useMoveHandler";
import PuzzleInfo from "@/components/panel/PuzzleInfo";
import useUpdateTheme from "@/hooks/useUpdateTheme";
import { initialFormState } from "@/constants/form";
import GameInfo from "@/components/panel/header/game-info/_index";
import useHandleSubmit from "@/hooks/useHandleSubmit";
import { Settings as SettingsIcon } from "lucide-react";
import ChessLoader from "@/components/common/ChessLoader";
import { ICON_SIZES } from "@/constants/ui";
import TrainerForm from "@/components/panel/header/new-session/form/TrainerForm";
import Settings from "@/components/panel/header/settings/_index";
import CreateNewSession from "@/components/panel/header/new-session/_index";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const { game } = usePuzzleSetup();

  const theme = useSelector((state: RootState) => state.theme.theme);

  useUpdateTheme(theme);

  const { handleMoveAttempt } = useMoveHandler(game);

  const [showSettings, setShowSettings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const [formData, setFormData] = useState<Fields>(initialFormState);

  const handleSubmit = useHandleSubmit(formData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  if (loading) {
    return <ChessLoader />;
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
        <>
          <div className="relative bh-12 flex items-center justify-end">
            <GameInfo />
            <CreateNewSession />
            <button
              aria-label="Settings"
              title="Settings"
              onClick={() => setShowSettings(true)}
              className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
            >
              <SettingsIcon size={ICON_SIZES.MEDIUM} />
            </button>
          </div>
          <PuzzleInfo />
        </>

        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      </div>
    </div>
  );
};

export default Playground;
