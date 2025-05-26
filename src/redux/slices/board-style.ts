import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardThemeState {
  board: string;
}

const initialState: BoardThemeState = {
  board: "brown",
};

const boardThemeSlice = createSlice({
  name: "boardTheme",
  initialState,
  reducers: {
    setBoardTheme(state, action: PayloadAction<string>) {
      state.board = action.payload;
    },
  },
});

export const { setBoardTheme } = boardThemeSlice.actions;
export default boardThemeSlice.reducer;
