import { toggleTheme } from "@/state/slices/theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isDarkModeActive } from "@/state/slices/theme";
import { ICON_SIZES } from "@/constants/icons";
import { Moon, Sun } from "lucide-react";
import Button from "../shared/Button";

interface ThemeChangerProps {
  buttonClassName?: string;
  showLabel?: boolean;
  iconSize?: number;
}

const ThemeChanger: React.FC<ThemeChangerProps> = ({ buttonClassName, showLabel = false, iconSize = ICON_SIZES.SMALL }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDarkModeActive);
  const toggleAppTheme = () => dispatch(toggleTheme());

  const defaultClassName = "w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4";
  return (
    <Button
      title="light or dark?"
      className={buttonClassName ?? defaultClassName}
      onClick={toggleAppTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
      {showLabel ? <span className="font-medium">Theme</span> : null}
    </Button>
  );
};

export default ThemeChanger;
