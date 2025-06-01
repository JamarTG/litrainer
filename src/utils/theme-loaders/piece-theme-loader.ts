const BASE_PIECE_THEMES_PATH =  "../../styles/piece/";

const themeModules = {
  alpha: () => import(BASE_PIECE_THEMES_PATH + "alpha.css"),
  anarcandy: () => import(BASE_PIECE_THEMES_PATH + "anarcandy.css"),
  caliente: () => import(BASE_PIECE_THEMES_PATH + "caliente.css"),
  california: () => import(BASE_PIECE_THEMES_PATH + "california.css"),
  cardinal: () => import(BASE_PIECE_THEMES_PATH + "cardinal.css"),
  cburnett: () => import(BASE_PIECE_THEMES_PATH + "cburnett.css"),
  celtic: () => import(BASE_PIECE_THEMES_PATH + "celtic.css"),
  chess7: () => import(BASE_PIECE_THEMES_PATH + "chess7.css"),
  chessnut: () => import(BASE_PIECE_THEMES_PATH + "chessnut.css"),
  companion: () => import(BASE_PIECE_THEMES_PATH + "companion.css"),
  cooke: () => import(BASE_PIECE_THEMES_PATH + "cooke.css"),
  dubrovny: () => import(BASE_PIECE_THEMES_PATH + "dubrovny.css"),
  fantasy: () => import(BASE_PIECE_THEMES_PATH + "fantasy.css"),
  firi: () => import(BASE_PIECE_THEMES_PATH + "firi.css"),
  fresca: () => import(BASE_PIECE_THEMES_PATH + "fresca.css"),
  gioco: () => import(BASE_PIECE_THEMES_PATH + "gioco.css"),
  governor: () => import(BASE_PIECE_THEMES_PATH + "governor.css"),
  horsey: () => import(BASE_PIECE_THEMES_PATH + "horsey.css"),
  icpieces: () => import(BASE_PIECE_THEMES_PATH + "icpieces.css"),
  "kiwen-suwi": () => import(BASE_PIECE_THEMES_PATH + "kiwen-suwi.css"),
  kosal: () => import(BASE_PIECE_THEMES_PATH + "kosal.css"),
  leipzig: () => import(BASE_PIECE_THEMES_PATH + "leipzig.css"),
  letter: () => import(BASE_PIECE_THEMES_PATH + "letter.css"),
  libra: () => import(BASE_PIECE_THEMES_PATH + "libra.css"),
  maestro: () => import(BASE_PIECE_THEMES_PATH + "maestro.css"),
  merida: () => import(BASE_PIECE_THEMES_PATH + "merida.css"),
  monarchy: () => import(BASE_PIECE_THEMES_PATH + "monarchy.css"),
  mono: () => import(BASE_PIECE_THEMES_PATH + "mono.css"),
  mpchess: () => import(BASE_PIECE_THEMES_PATH + "mpchess.css"),
  pirouetti: () => import(BASE_PIECE_THEMES_PATH + "pirouetti.css"),
  pixel: () => import(BASE_PIECE_THEMES_PATH + "pixel.css"),
  reillycraig: () => import(BASE_PIECE_THEMES_PATH + "reillycraig.css"),
  rhosgfx: () => import(BASE_PIECE_THEMES_PATH + "rhosgfx.css"),
  riohacha: () => import(BASE_PIECE_THEMES_PATH + "riohacha.css"),
  shapes: () => import(BASE_PIECE_THEMES_PATH + "shapes.css"),
  spatial: () => import(BASE_PIECE_THEMES_PATH + "spatial.css"),
  staunty: () => import(BASE_PIECE_THEMES_PATH + "staunty.css"),
  tatiana: () => import(BASE_PIECE_THEMES_PATH + "tatiana.css"),
  xkcd: () => import(BASE_PIECE_THEMES_PATH + "xkcd.css")
};

const loadedThemes = new Set<string>();

export const loadThemeCSS = async (themeName: string): Promise<void> => {
  if (loadedThemes.has(themeName)) {
    return;
  }

  try {
    if (themeModules[themeName as keyof typeof themeModules]) {
      await themeModules[themeName as keyof typeof themeModules]();
      loadedThemes.add(themeName);
      console.log(`Theme "${themeName}" loaded successfully`);
    } else {
      console.warn(`Theme "${themeName}" not found in themeModules`);
    }
  } catch (error) {
    console.error(`Failed to load theme: "${themeName}"`, error);
    throw error;
  }
};

export const availableThemes = Object.keys(themeModules);

export const isThemeAvailable = (themeName: string): boolean => {
  return themeName in themeModules;
};
