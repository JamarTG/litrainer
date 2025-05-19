import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlices";
import puzzleReducer from "./slices/puzzleSlices"
import feedbackReducer from "./slices/feedbackSlices";
import themeReducer from "./slices/themeSlices";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    puzzle: puzzleReducer,
    feedback: feedbackReducer,
    theme : themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
