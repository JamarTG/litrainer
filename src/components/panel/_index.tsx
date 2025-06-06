import GameInfo from "@/components/panel/header/game-info/_index";
import CreateNewSession from "@/components/panel/header/new-session/_index";
import { ICON_SIZES } from "@/constants/ui";
import { SettingsIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import stockfishPng from "../../../public/sf.png";
import { useEngineContext } from "@/context/hooks/useEngineContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PanelHeaderProps {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ setShowSettings }) => {
  const { engine } = useEngineContext();
  const engineName = engine?.getName();
  const isEngineRunning = useSelector((state: RootState) => state.engine.isRunning);
  const engineDepth = useSelector((state: RootState) => state.engine.depth);

  return (
    <div className="relative bh-12 dark:text-zinc-400 flex items-center justify-between">
      <div className="flex gap-1">
        <div className="flex flex-row gap-2 justify-center items-center text-xs">
          <img src={stockfishPng} width={40} height={40} alt={engineName} />
          {isEngineRunning ? (
            <p>evaluating move ...</p>
          ) : (
            <div className="flex flex-col justify-start">
              <p>{engineName}</p>
              <p>depth {engineDepth}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <GameInfo />
        <CreateNewSession />
        <button
          aria-label="Settings"
          title="Settings"
          onClick={() => setShowSettings(true)}
          className="w-16 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
        >
          <SettingsIcon size={ICON_SIZES.MEDIUM} />
        </button>
      </div>
    </div>
  );
};

export default PanelHeader;
