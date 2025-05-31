import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EngineState {
  isRunning: boolean;
}

const initialState: EngineState = {
  isRunning: false
};

const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {
    setEngineRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    }
  }
});

export const { setEngineRunning } = engineSlice.actions;
export default engineSlice.reducer;
