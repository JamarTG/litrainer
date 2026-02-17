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
      <div className="flex flex-col gap-4 items-center justify-start min-h-screen w-full">
        <div className="flex flex-col items-center justify-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
              <g
                fill="#7f7f7f"
                fillRule="evenodd"
                stroke="#7f7f7f"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
                <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-2 2.5-3c1 0 1 3 1 3" />
              </g>
            </svg>
            <div className="mb-2 text-6xl text-[var(--color-fg)] font-bold text-center"> litrainer</div>
          </div>

          <div className="mb-6 text-2xl text-[var(--color-muted)] text-center">Create an interactive learning experience from your games</div>
          <small className="text-[var(--color-muted)] max-w-md text-center font-medium">
            Please ensure you have games analyzed on Lichess. Only analyzed games will be available for training.
          </small>
        </div>
        <button
          className="px-6 py-3 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-lg font-semibold text-[var(--color-fg)] shadow-md hover:bg-[var(--color-surface)] transition-colors mb-4 flex items-center gap-2"
          onClick={() => setStarted(true)}
        >
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
