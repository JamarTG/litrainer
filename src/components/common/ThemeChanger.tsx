import { toggleTheme } from "@/state/slices/theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isDarkModeActive } from "@/state/slices/theme";
import { ICON_SIZES } from "@/constants/icons";
import { Moon, Sun } from "lucide-react";

interface ThemeChangerProps {
  buttonClassName?: string;
  showLabel?: boolean;
}

const ThemeChanger: React.FC<ThemeChangerProps> = ({ buttonClassName, showLabel = false }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDarkModeActive);
  const toggleAppTheme = () => dispatch(toggleTheme());

  const defaultClassName = "w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4";

  return (
    <button
      title="light or dark?"
      className={buttonClassName ?? defaultClassName}
      onClick={toggleAppTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={ICON_SIZES.LARGE} /> : <Moon size={ICON_SIZES.LARGE} />}
      {showLabel ? <span className="text-sm font-medium">Theme</span> : null}
    </button>
  );
};

export default ThemeChanger;
