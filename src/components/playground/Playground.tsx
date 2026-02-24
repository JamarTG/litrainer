import { FC, useState } from "react";
import InteractionModal from "@/components/shared/InteractionModal";
import { Puzzle } from "@/typing/interfaces";
import useInitPuzzles from "@/hooks/common/useInitPuzzles";
import useUpdateTheme from "@/hooks/common/useUpdateTheme";
import { TrainerForm } from "@/features/training-session";
import { ChessBoard } from "@/features/chessboard";
import { Panel } from "@/features/panel";

interface PlaygroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlaygroundProps> = ({ puzzles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interactionRequired, setInteractionRequired] = useState(true);

  useInitPuzzles(puzzles);
  useUpdateTheme();

  // const [started, setStarted] = useState(false);

  if (puzzles.length < 1) return <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;

  return (
    <div className="flex flex-col md:flex-row gap-0 md:gap-4 md:items-start md:justify-center md:mx-2 lg:mx-4 relative">
      <ChessBoard hidePieces={interactionRequired} />
      <Panel />
      {interactionRequired && (
        <InteractionModal
          isOpen={true}
          onConfirm={() => {
            setInteractionRequired(false);
            // setStarted(true);
          }}
        />
      )}
    </div>
  );
};

export default Playground;
