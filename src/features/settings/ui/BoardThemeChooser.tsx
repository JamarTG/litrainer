import { useDispatch, useSelector } from "react-redux";
import { getBoardTheme, setBoardTheme } from "@/state/slices/board-style";
import { BOARD_THEMES } from "@/constants/board";
import GenericChooser from "@/components/shared/GenericChooser";
import { playSelectSound } from "@/sound";

const BoardThemeChooser = () => {
  const dispatch = useDispatch();
  const boardTheme = useSelector(getBoardTheme);

  return (
    <GenericChooser
      label="Board Theme"
      options={BOARD_THEMES}
      selected={boardTheme}
      onSelect={(value) => {
        dispatch(setBoardTheme(value));
        playSelectSound();
      }}
      getDisplay={(theme) => (
        <div className="h-6 flex items-center gap-2 min-w-0">
          <img title={theme.name} src={theme.thumbnail ?? ""} className="w-8 h-4 rounded-sm" alt={theme.name} />
          <span className="truncate">{theme.name}</span>
        </div>
      )}
      getOptionKey={(option: { name: string; path: string; thumbnail: string | null }): string => option.name}
    />
  );
};

export default BoardThemeChooser;