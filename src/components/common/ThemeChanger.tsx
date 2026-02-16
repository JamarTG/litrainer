import { toggleTheme } from "@/state/slices/theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isDarkModeActive } from "@/state/slices/theme";
import { ICON_SIZES } from "@/constants/icons";
import { Moon, Sun } from "lucide-react";

const ThemeChanger = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDarkModeActive);
  const toggleAppTheme = () => dispatch(toggleTheme());

  return (
    <button
      title="light or dark?"
      className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
      onClick={toggleAppTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={ICON_SIZES.LARGE} /> : <Moon size={ICON_SIZES.LARGE} />}
    </button>
  );
};

export default ThemeChanger;
