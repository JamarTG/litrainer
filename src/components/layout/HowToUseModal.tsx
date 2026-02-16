import React from "react";
import { Info, User, ListChecks, Puzzle}  from "lucide-react";

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[var(--color-surface)] rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
          onClick={onClose}
          aria-label="Close help dialog"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Info size={22} className="text-[var(--color-muted)]" />
          How to Use litrainer
        </h2>
        <div className="mb-3 text-xs text-[var(--color-muted)]">
          <b>Note:</b> litrainer only includes games that have been analyzed with computer analysis on Lichess. If a game is missing, run computer analysis on it in Lichess first.
        </div>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <User size={16} className="mt-0.5 text-[var(--color-muted)]" />
            <span><b>Enter your Lichess username:</b> Load your recent games. No login or password is required.</span>
          </li>
          <li className="flex items-start gap-2">
            <ListChecks size={16} className="mt-0.5 text-[var(--color-muted)]" />
            <span><b>Select a game:</b> Only games with computer analysis on Lichess will appear.</span>
          </li>
          <li className="flex items-start gap-2">
            <Puzzle size={16} className="mt-0.5 text-[var(--color-muted)]" />
            <span><b>Solve the puzzles:</b> Try to find the best move for each position and get instant feedback.</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowToUseModal;
