const BOARD_STYLE_PATH = "../../styles/board/";

const boardModules = {
  "blue-marble": () => import(BOARD_STYLE_PATH + "blue-marble.css"),
  blue: () => import(BOARD_STYLE_PATH + "blue.css"),
  blue2: () => import(BOARD_STYLE_PATH + "blue2.css"),
  blue3: () => import(BOARD_STYLE_PATH + "blue3.css"),
  brown: () => import(BOARD_STYLE_PATH + "brown.css"),
  canvas2: () => import(BOARD_STYLE_PATH + "canvas2.css"),
  "green-plastic": () => import(BOARD_STYLE_PATH + "green-plastic.css"),
  green: () => import(BOARD_STYLE_PATH + "green.css"),
  grey: () => import(BOARD_STYLE_PATH + "grey.css"),
  horsey: () => import(BOARD_STYLE_PATH + "horsey.css"),
  ic: () => import(BOARD_STYLE_PATH + "ic.css"),
  leather: () => import(BOARD_STYLE_PATH + "leather.css"),
  maple: () => import(BOARD_STYLE_PATH + "maple.css"),
  maple2: () => import(BOARD_STYLE_PATH + "maple2.css"),
  marble: () => import(BOARD_STYLE_PATH + "marble.css"),
  metal: () => import(BOARD_STYLE_PATH + "metal.css"),
  "ncf-board": () => import(BOARD_STYLE_PATH + "ncf-board.css"),
  olive: () => import(BOARD_STYLE_PATH + "olive.css"),
  "pink-pyramid": () => import(BOARD_STYLE_PATH + "pink-pyramid.css"),
  purple: () => import(BOARD_STYLE_PATH + "purple.css"),
  wood: () => import(BOARD_STYLE_PATH + "wood.css"),
  wood2: () => import(BOARD_STYLE_PATH + "wood2.css"),
  wood3: () => import(BOARD_STYLE_PATH + "wood3.css"),
  wood4: () => import(BOARD_STYLE_PATH + "wood4.css")
};

const loadedBoardThemes = new Set<string>();

export const loadBoardThemeCSS = async (themeName: string): Promise<void> => {
  if (loadedBoardThemes.has(themeName)) {
    return;
  }

  try {
    if (boardModules[themeName as keyof typeof boardModules]) {
      await boardModules[themeName as keyof typeof boardModules]();
      loadedBoardThemes.add(themeName);
      console.log(`Board theme "${themeName}" loaded successfully`);
    } else {
      console.warn(`Board theme "${themeName}" not found in boardModules`);
    }
  } catch (error) {
    console.error(`Failed to load board theme: "${themeName}"`, error);
    throw error;
  }
};

export const availableBoardThemes = Object.keys(boardModules);

export const isBoardThemeAvailable = (themeName: string): boolean => {
  return themeName in boardModules;
};
