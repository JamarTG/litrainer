import { toggleTheme } from "@/redux/slices/theme";
import { moonIcon,sunIcon } from "@/assets/icons/ui";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isDarkModeActive } from "@/redux/slices/theme";
import { ICON_SIZES } from "@/constants/icons";

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
      <img src={isDarkMode ? sunIcon : moonIcon} width={ICON_SIZES.LARGE} alt="toggle theme" />
    </button>
  );
};

export default ThemeChanger;
