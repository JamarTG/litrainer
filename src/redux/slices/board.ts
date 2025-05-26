import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";
import { CSSProperties } from "react";

interface MoveSquares {
  [square: string]: CSSProperties;
}

interface MarkerPosition {
  right: number;
  top: number;
}

export interface BoardState {
  fen: string;
  sourceSquare: string | null;
  destinationSquare: string | null;
  moveSquares: MoveSquares;
  markerPosition: MarkerPosition;
}

const initialState: BoardState = {
  fen: new Chess().fen(),
  sourceSquare: null,
  destinationSquare: null,
  moveSquares: {},

  markerPosition: {
    right: 0,
    top: 0,
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoardStates(state, action: PayloadAction<{ sourceSquare: string; destinationSquare: string; fen: string; moveSquares: {} }>) {
      state.sourceSquare = action.payload.sourceSquare;
      state.destinationSquare = action.payload.destinationSquare;
      state.fen = action.payload.fen;
      state.moveSquares = action.payload.moveSquares;
    },
    setFen(state, action: PayloadAction<string>) {
      state.fen = action.payload;
    },
   
    clearMoveSquares(state) {
      state.moveSquares = {};
    },
    setMarkerPosition(state, action: PayloadAction<MarkerPosition>) {
      state.markerPosition = action.payload;
    },
    resetBoardState(state) {
      state = initialState;
    },
  },
});

export const {
  setFen,
  setMarkerPosition,
  clearMoveSquares,
  resetBoardState,
  updateBoardStates,
} = boardSlice.actions;

export default boardSlice.reducer;
