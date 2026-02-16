import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess, Square } from "chess.js";
import { RootState } from "../store";
import { initialPieceCounts } from "@/constants/piece";
import { Materials } from "@/typing/interfaces";

interface MarkerPosition {
  right: number;
  top: number;
}

export interface BoardState {
  fen: string;
  sourceSquare: string | null;
  destinationSquare: Square | null;
  markerPosition: MarkerPosition;
  materials: Materials;
  materialCalc: number;
}

const initialState: BoardState = {
  fen: new Chess().fen(),
  sourceSquare: null,
  destinationSquare: null,
  markerPosition: {
    right: 0,
    top: 0
  },
  materials: initialPieceCounts,
  materialCalc: 0
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoardStates(state, action: PayloadAction<{ sourceSquare: Square; destinationSquare: Square; fen: string }>) {
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
    updateMaterials(state, action: PayloadAction<Materials>) {
      state.materials = action.payload;
    },
    recalcMaterialCalc(state, action: PayloadAction<number>) {
      state.materialCalc = action.payload;
    },
    resetBoardState() {
      return initialState;
    }
  }
});

export const getFen = (state: RootState) => state.board.fen;
export const getMarkerPosition = (state: RootState) => state.board.markerPosition;
export const getSourceSquare = (state: RootState) => state.board.sourceSquare;
export const getDestinationSquare = (state: RootState) => state.board.destinationSquare;
export const getMaterials = (state: RootState) => state.board.materials;
export const { setFen, setMarkerPosition, updateMaterials, resetBoardState, updateBoardStates } = boardSlice.actions;

export default boardSlice.reducer;
