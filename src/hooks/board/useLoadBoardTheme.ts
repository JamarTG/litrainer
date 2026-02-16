import { getBoardTheme } from "@/state/slices/board-style";
import { isBoardThemeAvailable, loadBoardThemeCSS } from "@/utils/theme-loaders/board-theme-loader";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useLoadBoardTheme = () => {
  const boardTheme = useSelector(getBoardTheme);

  useEffect(() => {
    if (!isBoardThemeAvailable(boardTheme)) {
      console.warn(`Board theme "${boardTheme}" is not available.`);
      return;
    }

    loadBoardThemeCSS(boardTheme).catch((err) => {
      console.error(`Failed to load board theme CSS for "${boardTheme}":`, err);
    });
  }, [boardTheme]);
};

export default useLoadBoardTheme;
