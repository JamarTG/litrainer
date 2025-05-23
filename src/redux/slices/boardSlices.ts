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
  isLoading: boolean;
  markerPosition: MarkerPosition;
}

const initialState: BoardState = {
  fen: new Chess().fen(),
  sourceSquare: null,
  destinationSquare: null,
  moveSquares: {},
  isLoading: false,
  markerPosition: {
    right: 0,
    top: 0,
  },
};


const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setFen(state, action: PayloadAction<string>) {
      state.fen = action.payload;
    },
    setSourceSquare(state, action: PayloadAction<string | null>) {
      state.sourceSquare = action.payload;
    },
    setDestinationSquare(state, action: PayloadAction<string | null>) {
      state.destinationSquare = action.payload;
    },
    setMoveSquares(state, action: PayloadAction<MoveSquares>) {
      state.moveSquares = action.payload;
    },
    clearMoveSquares(state) {
      state.moveSquares = {};
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMarkerPosition(state, action: PayloadAction<MarkerPosition>) {
      state.markerPosition = action.payload;
    },
    resetBoard(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setFen, setSourceSquare, setDestinationSquare, setMoveSquares, setMarkerPosition, clearMoveSquares, setIsLoading, resetBoard } =
  boardSlice.actions;

export default boardSlice.reducer;
