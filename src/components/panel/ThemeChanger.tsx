import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleTheme } from "../../redux/slices/theme";
import useUpdateTheme from "../../hooks/useUpdateTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeChanger: FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useUpdateTheme(theme);

  return (
    <button
      title="light or dark?"
      className="w-16 p-2 rounded-lg flex sm:flex-row items-center justify-center sm:items-start gap-4"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeChanger;
