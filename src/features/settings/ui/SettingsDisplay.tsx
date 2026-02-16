import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import BoardThemeChooser from "./BoardThemeChooser";
import PieceSetChooser from "./PieceSetChooser";
import AutoSkip from "./AutoSkip";
import EngineDepthControl from "./EngineDepthControl";
import { ICON_SIZES } from "@/constants/icons";

interface SettingsProps {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const SettingsDisplay: React.FC<SettingsProps> = ({ setShowSettings }) => {
  return (
    <div
      style={{ zIndex: 100 }}
      className="absolute w-full min-h-[499px] inset-0 bg-[var(--color-surface-strong)] text-[var(--color-fg)] p-4 flex flex-col gap-4 animate-fade-in"
    >
      <div className="h-8 flex items-center justify-between">
        <button
          onClick={() => setShowSettings(false)}
          className="flex items-center gap-1 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition"
        >
          <ArrowLeft size={ICON_SIZES.MEDIUM} />
        </button>
      </div>
      <div className="flex h-full justify-center items-center">
        <div className="w-full max-w-md h-96 flex justify-center items-center  dark:border-zinc-600 rounded-md flex-col gap-4 mt-6">
          <div className="flex flex-col justify-center items-center  rounded-md p-4 gap-5">
            <div className="flex w-72 justify-start items-center">
              <AutoSkip />
            </div>
            <div className="flex w-72 justify-start items-center">
              <PieceSetChooser />
            </div>
            <div className="flex w-72 justify-start items-center">
              <BoardThemeChooser />
            </div>
            <div className="flex w-72 justify-start items-center">
              <EngineDepthControl />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDisplay;