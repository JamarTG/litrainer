import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";

export interface PieceSetFeedback {
  set: string;
}

const initialState: PieceSetFeedback = {
  set: loadFromLocalStorage("pieceSet", "pirouetti")
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

export const { setPieceSet } = pieceSetSlice.actions;
export default pieceSetSlice.reducer;
