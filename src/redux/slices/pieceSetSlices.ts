import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PieceSetFeedback {
  set: string;
}

const initialState: PieceSetFeedback = {
  set: "fresca",
};

const pieceSetSlice = createSlice({
  name: "pieceSet",
  initialState,
  reducers: {
    setPieceSet(state, action: PayloadAction<string>) {
      state.set = action.payload;
    },
  },
});

export const { setPieceSet } = pieceSetSlice.actions;
export default pieceSetSlice.reducer;
