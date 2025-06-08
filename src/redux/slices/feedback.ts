import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Classification } from "@/types/classification";
import { RootState } from "../store";

export interface FeedbackState {
  classification: Classification | null;
  bestMove: string | null;
  playedMove: string | null;
  isPuzzleSolved: boolean;
}

const initialState: FeedbackState = {
  classification: null,
  bestMove: null,
  playedMove: null,
  isPuzzleSolved: false
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
    setIsPuzzleSolved(state, action: PayloadAction<boolean>) {
      state.isPuzzleSolved = action.payload;
    },
    resetFeedback(state) {
      state.classification = null;
      state.bestMove = null;
      state.playedMove = null;
      state.isPuzzleSolved = false;
    }
  }
});

export const getBestMove = (state: RootState) => state.feedback.bestMove;
export const getIsPuzzleSolved = (state: RootState) => state.feedback.isPuzzleSolved;
export const getClassification = (state: RootState) => state.feedback.classification;
export const getPlayedMove = (state: RootState) => state.feedback.playedMove;
export const hasAttempted = (state: RootState) => !!state.feedback.playedMove;
export const { setClassification, setFeedback, setIsPuzzleSolved, resetFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
