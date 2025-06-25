import { useDispatch, useSelector } from "react-redux";
import { getBoardTheme, setBoardTheme } from "@/redux/slices/board-style";
import { BOARD_THEMES } from "@/constants/board-theme";

import GenericChooser from "../../../shared/GenericChooser";
import { playSelectSound } from "@/libs/sound";

const BoardThemeChooser = () => {
  const dispatch = useDispatch();
  const boardTheme = useSelector(getBoardTheme);

  return (
    <GenericChooser
      options={BOARD_THEMES}
      selected={boardTheme}
      onSelect={(value) => {
        dispatch(setBoardTheme(value));
        playSelectSound();
      }}
      getDisplay={(theme) => (
        <div className="h-8 flex items-center gap-1">
          <img title={theme.name} src={theme.thumbnail ?? ""} className="w-8 h-4" alt={theme.name} />
          {theme.name}
        </div>
      )}
      getOptionKey={(option: { name: string; path: string; thumbnail: string | null }): string => option.name}
    />
  );
};

export default BoardThemeChooser;
