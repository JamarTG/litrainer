import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Puzzle } from "../../types/puzzle";

export interface PuzzleState {
  puzzles: Puzzle[];
  currentIndex: number;
  autoSkip: boolean;
}

const initialState: PuzzleState = {
  puzzles: [],
  currentIndex: 0,
  autoSkip: JSON.parse(localStorage.getItem("autoSkip") ?? "true")
};

const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    setPuzzles(state, action: PayloadAction<Puzzle[]>) {
      state.puzzles = action.payload;
      state.currentIndex = 0;
    },
    nextPuzzle(state) {
      if (state.currentIndex < state.puzzles.length - 1) state.currentIndex += 1;
    },

    prevPuzzle(state) {
      if (state.currentIndex > 0) state.currentIndex -= 1;
    },
    toggleAutoSkip(state) {
      state.autoSkip = !state.autoSkip;
      localStorage.setItem("autoSkip", JSON.stringify(state.autoSkip));
    }
    // jumpToPuzzle(state, action: PayloadAction<number>) {
    //   if (action.payload >= 0 && action.payload < state.puzzles.length) {
    //     state.currentIndex = action.payload;
    //   }
    // }
  }
});

export const { setPuzzles, nextPuzzle, prevPuzzle, toggleAutoSkip } = puzzleSlice.actions;
export default puzzleSlice.reducer;
