import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { RootState } from "../store";
import { BOARD_STORAGE_FALLBACK, BOARD_STORAGE_KEY } from "@/constants/storage";

export interface BoardThemeState {
  board: string;
}

const initialState: BoardThemeState = {
  board: loadFromLocalStorage(BOARD_STORAGE_KEY, BOARD_STORAGE_FALLBACK)
};

const boardThemeSlice = createSlice({
  name: "boardTheme",
  initialState,
  reducers: {
    setBoardTheme(state, action: PayloadAction<string>) {
      state.board = action.payload;
      saveToLocalStorage(BOARD_STORAGE_KEY, action.payload);
    }
  }
});

export const getBoardTheme = (state: RootState) => state.boardTheme.board;
export const { setBoardTheme } = boardThemeSlice.actions;
export default boardThemeSlice.reducer;
