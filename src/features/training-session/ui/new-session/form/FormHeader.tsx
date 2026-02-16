import { SlidersHorizontal, X } from "lucide-react";

interface FormHeaderProps {
  closeModal: VoidFunction;
}

const FormHeader = ({ closeModal }: FormHeaderProps) => {
  return (
    <div className="py-1">
      <div className="flex gap-4 px-4">
        <div className="rounded-lg flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface-hover)] w-fit p-2.5">
          <SlidersHorizontal size={18} className="text-[var(--color-muted)]" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <h1 className="text-lg font-semibold text-[var(--color-fg)]">Training Session</h1>
            <button
              onClick={closeModal}
              className="my-auto p-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)] transition-colors"
              aria-label="Close form"
            >
              <X size={16} className="my-auto" />
            </button>
          </div>
          <p className="text-[var(--color-muted)] text-xs">Only analyzed games are included.</p>
        </div>
      </div>
      <div className="pt-5">
        <div className="w-full h-px bg-[var(--color-border)]" />
      </div>
    </div>
  );
};

export default FormHeader;