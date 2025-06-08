import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { RootState } from "../store";

export interface BoardThemeState {
  board: string;
}

const initialState: BoardThemeState = {
  board: loadFromLocalStorage("board", "brown")
};

const boardThemeSlice = createSlice({
  name: "boardTheme",
  initialState,
  reducers: {
    setBoardTheme(state, action: PayloadAction<string>) {
      state.board = action.payload;
      saveToLocalStorage("board", action.payload);
    }
  }
});

export const getBoardTheme = (state: RootState) => state.boardTheme.board;
export const { setBoardTheme } = boardThemeSlice.actions;
export default boardThemeSlice.reducer;
