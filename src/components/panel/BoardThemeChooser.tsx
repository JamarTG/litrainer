import { useDispatch, useSelector } from "react-redux";
import { setBoardTheme } from "../../redux/slices/boardThemeSlices";
import { BOARD_THEMES } from "../../constants/board";
import { RootState } from "../../redux/store";
import GenericChooser from "../shared/GenericChooser";

const BoardThemeChooser = () => {
  const dispatch = useDispatch();
  const boardTheme = useSelector((state: RootState) => state.boardTheme.board);

  return (
    <GenericChooser
      options={BOARD_THEMES}
      selected={boardTheme}
      onSelect={(value) => dispatch(setBoardTheme(value))}
      getDisplay={(theme) => (
        <div className="w-8 h-8 flex justify-center items-center">
          <img
            title={theme.name}
            src={theme.thumbnail ?? ""}
            className="w-8 h-4"
            alt={theme.name}
          />
        </div>
      )}
      getOptionKey={(option: { name: string; path: string; thumbnail: string | null }): string => option.name}
    />
  );
};

export default BoardThemeChooser;
