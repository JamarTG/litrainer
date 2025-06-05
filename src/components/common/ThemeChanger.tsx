import { ICON_SIZES } from "@/constants/ui";
import { toggleTheme } from "@/redux/slices/theme";
import { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ThemeChanger = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <button
      title="light or dark?"
      className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Sun size={ICON_SIZES.MEDIUM} /> : <Moon size={ICON_SIZES.MEDIUM} />}
    </button>
  );
};

export default ThemeChanger;
