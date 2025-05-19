import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Classification } from '../../../types/classification';

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
  isPuzzleSolved: false,
};

interface Feedback {
    best: string | null;
    played: string | null;
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setClassification(state, action: PayloadAction<Classification | null>) {
      state.classification = action.payload;
    },
    setFeedback(state, action: PayloadAction<Feedback>) {
      state.bestMove = action.payload.best;
      state.playedMove = action.payload.played;
    },
    setIsPuzzleSolved(state, action: PayloadAction<boolean>) {
      state.isPuzzleSolved = action.payload;
    },
    resetFeedback(state) {
      state.classification = null;
      state.bestMove = null;
      state.playedMove = null;
      state.isPuzzleSolved = false;
    },
  },
});

export const {
  setClassification,
  setFeedback,
  setIsPuzzleSolved,
  resetFeedback,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
