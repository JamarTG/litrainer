import { configureStore } from '@reduxjs/toolkit'
import puzzleReducer from './slices/puzzle'
import feedbackReducer from './slices/feedback'
import themeReducer from './slices/theme'
import boardReducer from './slices/board'
import pieceSetReducer from './slices/piece-set'
import boardThemeReducer from './slices/board-style'
import engineReducer from './slices/engine'

export const store = configureStore({
  reducer: {
    puzzle: puzzleReducer,
    feedback: feedbackReducer,
    theme: themeReducer,
    board: boardReducer,
    pieceSet: pieceSetReducer,
    boardTheme: boardThemeReducer,
    engine: engineReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
