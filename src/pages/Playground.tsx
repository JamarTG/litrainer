import { FC, useState } from "react";
import { Puzzle } from "@/typing/interfaces";
import useInitPuzzles from "@/hooks/common/useInitPuzzles";
import useUpdateTheme from "@/hooks/common/useUpdateTheme";
import TrainerForm from "@/components/panel/header/new-session/form/TrainerForm";
import ChessBoard from "@/components/board";
import Panel from "@/components/panel";

interface PlayGroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlayGroundProps> = ({ puzzles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useInitPuzzles(puzzles);
  useUpdateTheme();

  if (puzzles.length < 1) return <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;

  return (
    <div className="flex gap-6 justify-center items-center flex-wrap h-full min-[1000px]:flex-nowrap md:mx-2 lg:mx-4">
      <ChessBoard />
      <Panel />
    </div>
  );
};

export default Playground;
