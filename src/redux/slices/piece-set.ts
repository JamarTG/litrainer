import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { RootState } from "../store";

export interface PieceSetFeedback {
  set: string;
}

const initialState: PieceSetFeedback = {
  set: loadFromLocalStorage("pieceSet", "staunty")
};

const pieceSetSlice = createSlice({
  name: "pieceSet",
  initialState,
  reducers: {
    setPieceSet(state, action: PayloadAction<string>) {
      state.set = action.payload;
      saveToLocalStorage("pieceSet", action.payload);
    }
  }
});

export const getPieceSet = (state: RootState) => state.pieceSet.set;
export const { setPieceSet } = pieceSetSlice.actions;
export default pieceSetSlice.reducer;
