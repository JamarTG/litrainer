import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Puzzle } from "@/types/lichess";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { RootState } from "../store";
import { Color } from "chess.js";

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
      state.puzzles[state.currentIndex] = {
        ...currentPuzzle
      };
      state.redoTrigger += 1;
    }
  }
});

export const getPuzzle = (state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex];

export const getGameMoves = (state: RootState) => {
  const puzzle = getPuzzle(state);
  return {
    opponentMove: puzzle.opponentMove,
    userMove: puzzle.userMove
  };
};

export const getPlayerByShortColor = (color: Color) => (state: RootState) => {
  const puzzle = getPuzzle(state);
  return puzzle.players[color === "w" ? "white" : "black"];
};

export const isFirstPuzzle = (state: RootState) => state.puzzle.currentIndex == 0;
export const isLastPuzzle = (state: RootState) => state.puzzle.currentIndex >= state.puzzle.puzzles.length - 1;
export const getUserColor = (state: RootState) => getPuzzle(state)?.userMove?.color[0]?.toLocaleLowerCase();

// export const ge

// puzzles: Puzzle[];
//   currentIndex: number;
//   autoSkip: boolean;
//   redoTrigger: number;

export const { setPuzzles, nextPuzzle, prevPuzzle, toggleAutoSkip, redoPuzzle } = puzzleSlice.actions;
export default puzzleSlice.reducer;
