import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  fen: string;
}

const initialState: GameState = {
  fen: "", 
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setFen(state, action: PayloadAction<string>) {
      state.fen = action.payload;
    },
    resetGame(state) {
      state.fen = ""; 
    },
  },
});

export const { setFen, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
