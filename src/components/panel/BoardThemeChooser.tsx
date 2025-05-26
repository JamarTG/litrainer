import { useDispatch, useSelector } from "react-redux";
import { setBoardTheme } from "../../redux/slices/board-style";
import { BoardThemes } from "../../constants/board";
import { RootState } from "../../redux/store";
import GenericChooser from "../shared/GenericChooser";
import { playSelectSound } from "../../lib/sound";

const BoardThemeChooser = () => {
  const dispatch = useDispatch();
  const boardTheme = useSelector((state: RootState) => state.boardTheme.board);

  return (
    <GenericChooser
      options={BoardThemes}
      selected={boardTheme}
      onSelect={(value) => {
        console.log(value, "this");
        dispatch(setBoardTheme(value));
        playSelectSound();
      }}
      getDisplay={(theme) => (
        <div className="h-8 flex items-center gap-1">
          <img
            title={theme.name}
            src={theme.thumbnail ?? ""}
            className="w-8 h-4"
            alt={theme.name}
          />
          {theme.name}
        </div>
      )}
      getOptionKey={(option: { name: string; path: string; thumbnail: string | null }): string => option.name}
    />
  );
};

export default BoardThemeChooser;
