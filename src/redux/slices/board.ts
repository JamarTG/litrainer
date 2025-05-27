import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

interface MarkerPosition {
  right: number;
  top: number;
}

export interface BoardState {
  fen: string;
  sourceSquare: string | null;
  destinationSquare: string | null;
  markerPosition: MarkerPosition;
}

const initialState: BoardState = {
  fen: new Chess().fen(),
  sourceSquare: null,
  destinationSquare: null,
  markerPosition: {
    right: 0,
    top: 0,
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoardStates(state, action: PayloadAction<{ sourceSquare: string; destinationSquare: string; fen: string}>) {
      state.sourceSquare = action.payload.sourceSquare;
      state.destinationSquare = action.payload.destinationSquare;
      state.fen = action.payload.fen;

    },
    setFen(state, action: PayloadAction<string>) {
      state.fen = action.payload;
    },

    setMarkerPosition(state, action: PayloadAction<MarkerPosition>) {
      state.markerPosition = action.payload;
    },
    resetBoardState() {
      return initialState;
    },
  },
});

export const {
  setFen,
  setMarkerPosition,
  resetBoardState,
  updateBoardStates,
} = boardSlice.actions;

export default boardSlice.reducer;
