import { useDispatch, useSelector } from "react-redux";
import { getBoardTheme, setBoardTheme } from "@/state/slices/board-style";
import { BOARD_THEMES } from "@/constants/board";
import GenericChooser from "@/components/shared/GenericChooser";
import { playSelectSound } from "@/sound";

const BoardThemeChooser = () => {
  const dispatch = useDispatch();
  const boardTheme = useSelector(getBoardTheme);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[var(--color-fg)]">Board Theme</span>
        {(() => {
          const current = BOARD_THEMES.find((theme) => theme.path === boardTheme || theme.name === boardTheme);
          if (!current) return null;
          return (
            <div className="flex items-center gap-2 min-w-0" title={current.name}>
              <img
                src={current.thumbnail ?? ""}
                className="w-9 h-5 rounded-sm border border-[var(--color-border)]"
                alt={current.name}
              />
            </div>
          );
        })()}
      </div>

      <GenericChooser
        options={BOARD_THEMES}
        selected={boardTheme}
        onSelect={(value) => {
          dispatch(setBoardTheme(value));
          playSelectSound();
        }}
        getDisplay={(theme) => (
          <div className="h-6 flex items-center gap-2 min-w-0">
            <img
              title={theme.name}
              src={theme.thumbnail ?? ""}
              className="w-8 h-4 rounded-sm border border-[var(--color-border)]"
              alt={theme.name}
            />
            <span className="truncate text-sm">{theme.name}</span>
          </div>
        )}
        getOptionKey={(option: { name: string; path: string; thumbnail: string | null }): string => option.name}
      />
    </div>
  );
};

export default BoardThemeChooser;