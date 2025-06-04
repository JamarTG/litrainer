import { ICON_SIZES } from "@/components/constants";
import AutoSkip from "@/components/panel/main-buttons/settings/AutoSkip";
import BoardThemeChooser from "@/components/panel/main-buttons/settings/BoardThemeChooser";
import EngineDepthControl from "@/components/panel/main-buttons/settings/EngineDepthControl";
import PieceSetChooser from "@/components/panel/main-buttons/settings/PieceSetChooser";
import { toggleTheme } from "@/redux/slices/theme";
import { RootState } from "@/redux/store";
import { ArrowBigLeftDash, Moon, Sun } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface SettingsProps {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
  showSettings: boolean;
}

const Settings: React.FC<SettingsProps> = ({ showSettings, setShowSettings }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  if (!showSettings) return;

  return (
    <div
      style={{ zIndex: 100 }}
      className="absolute inset-0 bg-[#e7e3e3] dark:bg-zinc-900 p-4 flex flex-col gap-4 animate-fade-in h-screen"
    >
      <div className="h-8 flex items-center justify-between">
        <button
          onClick={() => setShowSettings(false)}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowBigLeftDash size={ICON_SIZES.MEDIUM} />
        </button>
        <button
          title="light or dark?"
          className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Sun size={ICON_SIZES.MEDIUM} /> : <Moon size={ICON_SIZES.MEDIUM} />}
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

export default Settings;
