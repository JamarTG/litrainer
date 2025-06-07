import { FC, useEffect, useState } from "react";
import { Fields, Puzzle } from "@/types/lichess";
import InteractiveChessBoard from "@/components/board/_index";
import usePuzzleSetup from "@/hooks/usePuzzleSetup";
import useInitPuzzles from "@/hooks/useInitPuzzles";
import { useMoveHandler } from "@/hooks/useMoveHandler";
import PuzzleInfo from "@/components/panel/PuzzleInfo";
import useUpdateTheme from "@/hooks/useUpdateTheme";
import { initialFormState } from "@/constants/form";
import useHandleSubmit from "@/hooks/useHandleSubmit";
import ChessLoader from "@/components/common/ChessLoader";
import TrainerForm from "@/components/panel/header/new-session/form/TrainerForm";
import Settings from "@/components/panel/header/settings/_index";
import PanelHeader from "../components/panel/_index";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  useInitPuzzles(puzzles);

  const { game } = usePuzzleSetup();

  useUpdateTheme();

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
      <div className=" bg-zinc-300 flex flex-col gap-4 w-full min-w-[250px] min-h-[500px] p-4 rounded-sm shadow-xs border border-gray-400 dark:bg-[#222] dark:border-gray-700">
        <>
          <PanelHeader setShowSettings={setShowSettings} />
          <PuzzleInfo />
        </>
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      </div>
    </div>
  );
};

export default Playground;
