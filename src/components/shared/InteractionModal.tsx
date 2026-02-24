import { FC } from "react";

interface InteractionModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const InteractionModal: FC<InteractionModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white dark:bg-[var(--color-surface-strong)] p-6 rounded-lg shadow-lg max-w-md w-full text-center border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold mb-4 text-[var(--color-fg)]">Welcome!</h2>
        <p className="mb-6 text-[var(--color-muted)]">
          Puzzles have been preloaded from games of <b>JamariTheGreat</b>.<br />Click below to begin training.
        </p>
        <button
          className="px-4 py-2 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-lg font-semibold text-[var(--color-fg)] hover:bg-[var(--color-surface)] transition-colors"
          onClick={onConfirm}
        >
          Start Training
        </button>
      </div>
    </div>
  );
};

export default InteractionModal;
