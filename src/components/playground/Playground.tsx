import { FC, useState } from "react";
import { Puzzle } from "@/typing/interfaces";
import useInitPuzzles from "@/hooks/common/useInitPuzzles";
import useUpdateTheme from "@/hooks/common/useUpdateTheme";
import { TrainerForm } from "@/features/training-session";
import { ChessBoard } from "@/features/chessboard";
import { Panel } from "@/features/panel";
import { Dumbbell } from "lucide-react";

interface PlaygroundProps {
  puzzles: Puzzle[];
}

const Playground: FC<PlaygroundProps> = ({ puzzles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useInitPuzzles(puzzles);
  useUpdateTheme();

  const [started, setStarted] = useState(false);

  if (puzzles.length < 1) return <TrainerForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;

  if (!started) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center justify-center">
          
          <div className="mb-2 text-6xl text-[var(--color-fg)] font-bold text-center">litrainer</div>
          <div className="mb-6 text-2xl text-[var(--color-muted)] text-center">Create an interactive learning experience from your games</div>
          <small className="text-[var(--color-muted)] max-w-md text-center font-medium">
            Please ensure you have games analyzed on Lichess. Only analyzed games will be available for training.
          </small>
        </div>
        <button
          className="px-6 py-3 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-lg font-semibold text-[var(--color-fg)] shadow-md hover:bg-[var(--color-surface)] transition-colors mb-4 flex items-center gap-2"
          onClick={() => setStarted(true)}
        >
          <Dumbbell size={28} className="#57534e" />
          Start Training
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-0 md:gap-4 md:items-start md:justify-center md:mx-2 lg:mx-4">
      <ChessBoard />
      <Panel />
    </div>

  );
};

export default Playground;
