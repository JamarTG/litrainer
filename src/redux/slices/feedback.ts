import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Classification } from "@/typing/types";
import { RootState } from "../store";

export type PuzzleStatus = "unsolved" | "solved" | "failed";

export interface FeedbackState {
  classification: Classification | null;
  bestMove: string | null;
  playedMove: string | null;
  puzzleStatus: PuzzleStatus;
}

const initialState: FeedbackState = {
  classification: null,
  bestMove: null,
  playedMove: null,
  puzzleStatus: "unsolved"
};

export interface Feedback {
  bestMove: string | null;
  playedMove: string | null;
}

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setClassification(state, action: PayloadAction<Classification | null>) {
      state.classification = action.payload;
    },
    setFeedback(state, action: PayloadAction<Feedback>) {
      state.bestMove = action.payload.bestMove;
      state.playedMove = action.payload.playedMove;
    },
    setPuzzleStatus(state, action: PayloadAction<PuzzleStatus>) {
      state.puzzleStatus = action.payload;
    },
    resetFeedback(state) {
      state.classification = null;
      state.bestMove = null;
      state.playedMove = null;
      state.puzzleStatus = "unsolved";
    }
  }
});

export const getBestMove = (state: RootState) => state.feedback.bestMove;
export const getPuzzleStatus = (state: RootState) => state.feedback.puzzleStatus;
export const getClassification = (state: RootState) => state.feedback.classification;
export const getPlayedMove = (state: RootState) => state.feedback.playedMove;
export const hasAttempted = (state: RootState) => !!state.feedback.playedMove;
export const { setClassification, setFeedback, setPuzzleStatus, resetFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
