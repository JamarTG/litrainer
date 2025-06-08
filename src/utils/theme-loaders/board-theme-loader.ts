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

let currentBoardTheme: string | null = null;

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
    if (!boardModules[themeName as keyof typeof boardModules]) {
      console.warn(`Board theme "${themeName}" not found in boardModules, using default`);
    }

    await boardModules[themeName as keyof typeof boardModules]();

    const boardContainer = document.querySelector(".main-board") as HTMLElement;

    if (boardContainer) {
      availableBoardThemes.forEach((theme) => {
        boardContainer.classList.remove(`board-theme-${theme}`);
      });

      boardContainer.classList.add(`board-theme-${themeName}`);

      console.log(`Theme "${themeName}" applied via CSS class`);
    } else {
      console.error("Could not find .main-board element to apply theme");
    }

    currentBoardTheme = themeName;
  } catch (error) {
    console.error(`Failed to load board theme: "${themeName}"`, error);
    throw error;
  }
};

export const availableBoardThemes = Object.keys(boardModules);

export const isBoardThemeAvailable = (themeName: string): boolean => {
  return themeName in boardModules;
};
