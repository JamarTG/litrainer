import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ENGINE_DEPTH_STORAGE_FALLBACK, ENGINE_DEPTH_STORAGE_KEY } from "@/constants/storage";

export interface EngineState {
  isRunning: boolean;
  depth: number;
}

const initialState: EngineState = {
  isRunning: false,
  depth: Number(loadFromLocalStorage(ENGINE_DEPTH_STORAGE_KEY, ENGINE_DEPTH_STORAGE_FALLBACK))
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {
    setEngineRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
    setDepth(state, action: PayloadAction<number>) {
      state.depth = action.payload;
      saveToLocalStorage(ENGINE_DEPTH_STORAGE_KEY, action.payload.toString());
    }
  }
});

export const getEngineDepth = (state: RootState) => state.engine.depth;
export const getEngineState = (state: RootState) => state.engine.isRunning;
export const { setEngineRunning, setDepth } = engineSlice.actions;
export default engineSlice.reducer;
