import { FC, useState } from "react";
import { Puzzle } from "@/types/lichess";
import useInitPuzzles from "@/hooks/useInitPuzzles";
import useUpdateTheme from "@/hooks/useUpdateTheme";
import TrainerForm from "@/components/panel/header/new-session/form/TrainerForm";
import ChessBoard from "@/components/board/_index";
import Panel from "@/components/panel/_index";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  useInitPuzzles(puzzles);
  useUpdateTheme();

  const noPuzzles = puzzles.length == 1;

  if (noPuzzles) return <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;

  return (
    <div className="flex gap-6 justify-center items-center flex-wrap h-full min-[1000px]:flex-nowrap md:mx-2 lg:mx-4">
      <ChessBoard />
      <Panel />
    </div>
  );
};

export default Playground;
