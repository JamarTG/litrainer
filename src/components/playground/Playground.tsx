import { FC, useState } from "react";
import { Puzzle } from "@/typing/interfaces";
import useInitPuzzles from "@/hooks/common/useInitPuzzles";
import useUpdateTheme from "@/hooks/common/useUpdateTheme";
import { TrainerForm } from "@/features/training-session";
import { ChessBoard } from "@/features/chessboard";
import { Panel } from "@/features/panel";
import Icon from '@mdi/react';
import { mdiChessKing, mdiChessKnight } from '@mdi/js';

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
          <div className="mb-6 text-4xl text-[var(--color-muted)] text-center">Create an interactive learning experience from your games</div>
          

          <small className="text-[var(--color-muted)] max-w-md text-center font-medium">
            Please ensure you have games analyzed on Lichess. Only analyzed games will be available for training.
          </small>

         
        </div>

         <button
            className="px-6 py-3 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-lg font-semibold text-[var(--color-fg)] shadow-md hover:bg-[var(--color-surface)] transition-colors mb-4 flex items-center gap-2"
            onClick={() => setStarted(true)}
          >
            <svg width="28" height="28" viewBox="0 0 45 45" className="mr-1" style={{ minWidth: 28 }}>
              <g fill="none" fillRule="evenodd" stroke="#57534e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path fill="#57534e" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/>
                <path fill="#57534e" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/>
                <path fill="#000" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z"/>
              </g>
            </svg>
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
