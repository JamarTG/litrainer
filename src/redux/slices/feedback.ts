import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Classification } from '../../types/classification';

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

interface FeedbackMove {
    bestMove: string | null;
    playedMove: string | null;
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setClassification(state, action: PayloadAction<Classification | null>) {
      state.classification = action.payload;
    },
    setFeedbackMoves(state, action: PayloadAction<FeedbackMove>) {
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
    }, 
  },
});

export const {
  setClassification,
  setFeedbackMoves,
  setIsPuzzleSolved,
  resetFeedback,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
