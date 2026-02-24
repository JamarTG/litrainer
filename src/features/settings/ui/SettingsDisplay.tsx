import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import BoardThemeChooser from "./BoardThemeChooser";
import PieceSetChooser from "./PieceSetChooser";
import EngineDepthControl from "./EngineDepthControl";
import { ICON_SIZES } from "@/constants/icons";

interface SettingsProps {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const SettingsDisplay: React.FC<SettingsProps> = ({ setShowSettings }) => {
  return (
    <div
      style={{ zIndex: 100 }}
      className="absolute inset-0 w-full min-h-[499px] bg-[var(--color-surface-strong)] text-[var(--color-fg)] p-3 flex flex-col gap-3 animate-fade-in"
    >
      <div className="h-10 flex items-center justify-between px-1">
        <button
          onClick={() => setShowSettings(false)}
          className="flex items-center justify-center h-8 w-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Close settings"
        >
          <ArrowLeft size={ICON_SIZES.SMALL} />
        </button>
        <h2 className="text-4xl uppercase tracking-wide text-[var(--color-muted)] font-extrabold">Settings</h2>
        <span className="w-8" />
      </div>

      <div className="flex flex-1 justify-center items-start pt-2">
        <div className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 space-y-3">
          {/* <AutoSkip /> */}
          <PieceSetChooser />
          <BoardThemeChooser />
          <EngineDepthControl />
        </div>
      </div>
    </div>
  );
};

export default SettingsDisplay;