import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Puzzle } from "../../types/puzzle";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/storage";

export interface PuzzleState {
  puzzles: Puzzle[];
  currentIndex: number;
  autoSkip: boolean;
  redoTrigger: number;
}

const initialState: PuzzleState = {
  puzzles: [],
  currentIndex: 0,
  autoSkip: loadFromLocalStorage("autoSkip", "true") === "true",
  redoTrigger: 0
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
      saveToLocalStorage("autoSkip", state.autoSkip);
    },
    redoPuzzle(state) {
      const currentPuzzle = state.puzzles[state.currentIndex];
      if (currentPuzzle && initialState) {
        state.puzzles[state.currentIndex] = {
          ...currentPuzzle,
          ...initialState
        };
      }
      state.redoTrigger += 1; 
    }
  }
});

export const { setPuzzles, nextPuzzle, prevPuzzle, toggleAutoSkip, redoPuzzle } = puzzleSlice.actions;
export default puzzleSlice.reducer;
