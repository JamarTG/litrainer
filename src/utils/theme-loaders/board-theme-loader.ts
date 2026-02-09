import { BOARD_THEMES } from "@/constants/board";

let currentBoardTheme: string | null = null;
const BOARD_STYLE_ID = "board-theme";

const generateBoardCSS = (boardThemePath: string) => {
  return `.cg-wrap {background-image: url("${boardThemePath}");background-size: cover;}`;
};

export const loadBoardThemeCSS = async (themeName: string | null): Promise<void> => {
  console.log("loadBoardThemeCSS called with:", { currentBoardTheme, themeName });

  if (!themeName) {
    console.warn(`Board theme is null/undefined, using default`);
  }

  if (currentBoardTheme === themeName) {
    console.log(`Theme "${themeName}" already loaded, skipping`);
    return;
  }

  try {
    if (!themeName) {
      console.log("no theme name provided");
      return;
    }

    let boardThemeExisting = BOARD_THEMES.find((theme) => theme.name === themeName);

    if (!boardThemeExisting) {
      boardThemeExisting = BOARD_THEMES.find((theme) => theme.name === "brown")!;
      console.warn(`Board theme "${themeName}" not found in boardModules, using default`);
    }

    const existingStyle = document.getElementById(BOARD_STYLE_ID);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement("style");
    styleElement.id = BOARD_STYLE_ID;
    styleElement.textContent = generateBoardCSS(boardThemeExisting?.path || "alpha");
    document.head.appendChild(styleElement);

    console.log(`Theme "${themeName}" applied via CSS class`);
    currentBoardTheme = themeName;
  } catch (error) {
    console.error(`Failed to load board theme: "${themeName}"`, error);
    throw error;
  }
};


export const isBoardThemeAvailable = (themeName: string): boolean => {
  const availableBoardThemes = BOARD_THEMES.map((theme) => theme.name);
  return availableBoardThemes.includes(themeName);
};
