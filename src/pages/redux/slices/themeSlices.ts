import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Theme = "light" | "dark";

export interface ThemeState {
    theme: Theme    
}

const initialState: ThemeState = {
    theme: "light", 
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setTheme(state, action : PayloadAction<ThemeState>) {
            state.theme = action.payload.theme;
        }
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;