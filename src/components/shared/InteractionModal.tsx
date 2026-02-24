import { FC } from "react";
import Button from "./Button";

interface InteractionModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const InteractionModal: FC<InteractionModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white dark:bg-[var(--color-surface-strong)] p-6 rounded-lg shadow-lg max-w-md w-full text-center border border-[var(--color-border)]">
        <Button
          className="w-full mb-2 py-3 text-lg"
          onClick={onConfirm}
        >
          Click to Enable Sound & Start
        </Button>
        <div className="text-xs text-[var(--color-muted)]">This is required so sounds can play during training.</div>
      </div>
    </div>
  );
};

export default InteractionModal;
