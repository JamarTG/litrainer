import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { RootState } from "../store";
import { THEME_STORAGE_FALLBACK, THEME_STORAGE_KEY } from "@/constants/storage";

export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: loadFromLocalStorage<Theme>(THEME_STORAGE_KEY, THEME_STORAGE_FALLBACK)
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveToLocalStorage(THEME_STORAGE_KEY, state.theme);
    },
    setTheme(state, action: PayloadAction<ThemeState>) {
      state.theme = action.payload.theme;
    }
  }
});

export const isDarkModeActive = (state: RootState) => state.theme.theme == "dark";

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
