import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { RootState } from "../store";
import { PIECE_SET_STORAGE_FALLBACK, PIECE_SET_STORAGE_KEY } from "@/constants/storage";

export interface PieceSetFeedback {
  set: string;
}

const initialState: PieceSetFeedback = {
  set: loadFromLocalStorage(PIECE_SET_STORAGE_KEY, PIECE_SET_STORAGE_FALLBACK)
};

const pieceSetSlice = createSlice({
  name: "pieceSet",
  initialState,
  reducers: {
    setPieceSet(state, action: PayloadAction<string>) {
      state.set = action.payload;
      saveToLocalStorage(PIECE_SET_STORAGE_KEY, action.payload);
    }
  }
});

export const getPieceSet = (state: RootState) => state.pieceSet.set;
export const { setPieceSet } = pieceSetSlice.actions;
export default pieceSetSlice.reducer;
