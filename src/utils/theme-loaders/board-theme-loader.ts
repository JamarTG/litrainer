import { BOARD_THEMES } from "@/constants/board";

const boardModules = {
  "blue-marble": () => import("@/styles/board/blue-marble.css"),
  blue: () => import("@/styles/board/blue.css"),
  blue2: () => import("@/styles/board/blue2.css"),
  blue3: () => import("@/styles/board/blue3.css"),
  brown: () => import("@/styles/board/brown.css"),
  canvas2: () => import("@/styles/board/canvas2.css"),
  "green-plastic": () => import("@/styles/board/green-plastic.css"),
  green: () => import("@/styles/board/green.css"),
  grey: () => import("@/styles/board/grey.css"),
  horsey: () => import("@/styles/board/horsey.css"),
  ic: () => import("@/styles/board/ic.css"),
  leather: () => import("@/styles/board/leather.css"),
  maple: () => import("@/styles/board/maple.css"),
  maple2: () => import("@/styles/board/maple2.css"),
  marble: () => import("@/styles/board/marble.css"),
  metal: () => import("@/styles/board/metal.css"),
  "ncf-board": () => import("@/styles/board/ncf-board.css"),
  olive: () => import("@/styles/board/olive.css"),
  "pink-pyramid": () => import("@/styles/board/pink-pyramid.css"),
  purple: () => import("@/styles/board/purple.css"),
  wood: () => import("@/styles/board/wood.css"),
  wood2: () => import("@/styles/board/wood2.css"),
  wood3: () => import("@/styles/board/wood3.css"),
  wood4: () => import("@/styles/board/wood4.css")
};

// const loadedBoardThemes = new Set<string>();
let currentBoardTheme: string | null = null;

export const loadBoardThemeCSS = async (themeName: string): Promise<void> => {
  if (currentBoardTheme === themeName) {
    return;
  }

  try {
    if (!boardModules[themeName as keyof typeof boardModules]) {
      console.warn(`Board theme "${themeName}" not found in boardModules`);
      return;
    }

    const theme = BOARD_THEMES.find((theme) => theme.name === themeName);

    const cgWrap = document.querySelector(".cg-wrap") as HTMLElement;
    if (cgWrap) {
      cgWrap.style.backgroundImage = `url("${theme?.path}")`;
      cgWrap.style.backgroundSize = "cover";
    }

    currentBoardTheme = themeName;
    console.log(`Board theme "${themeName}" applied`);
  } catch (error) {
    console.error(`Failed to load board theme: "${themeName}"`, error);
    throw error;
  }
};

export const availableBoardThemes = Object.keys(boardModules);

export const isBoardThemeAvailable = (themeName: string): boolean => {
  return themeName in boardModules;
};
