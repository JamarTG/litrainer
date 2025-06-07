import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";

export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: loadFromLocalStorage<Theme>("theme", "light")
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveToLocalStorage("theme", state.theme);
    },
    setTheme(state, action: PayloadAction<ThemeState>) {
      state.theme = action.payload.theme;
    }
  }
});

export const isDarkModeActive = (state: ThemeState) => state.theme == "dark";

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
