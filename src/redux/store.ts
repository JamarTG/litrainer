import { configureStore } from "@reduxjs/toolkit";
import puzzleReducer from "./slices/puzzleSlices"
import feedbackReducer from "./slices/feedbackSlices";
import themeReducer from "./slices/themeSlices";
import boardReducer from "./slices/boardSlices";
import pieceSetReducer from "./slices/pieceSet";

export const store = configureStore({
  reducer: {
    puzzle: puzzleReducer,
    feedback: feedbackReducer,
    theme : themeReducer,
    board : boardReducer,
    pieceSet : pieceSetReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
