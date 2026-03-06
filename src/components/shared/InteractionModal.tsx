import { FC } from "react";
import Button from "./Button";

interface InteractionModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const InteractionModal: FC<InteractionModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative pointer-events-auto bg-white dark:bg-[var(--color-surface-strong)] p-4 rounded-lg shadow-lg max-w-sm w-full text-center border border-[var(--color-border)]">
        <Button
          className="w-full mb-2 py-2 text-sm sm:text-base"
          onClick={onConfirm}
        >
          Click to Enable Sound & Start
        </Button>
        <div className="text-xs text-[var(--color-muted)]">A quick click is required so sounds can play during training.</div>
      </div>
    </div>
  );
};

export default InteractionModal;
