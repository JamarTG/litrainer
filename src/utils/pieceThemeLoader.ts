import "../styles/piece/alpha.css"

const themeModules = {
  alpha: () => import("../styles/piece/alpha.css"),
  anarcandy: () => import("../styles/piece/anarcandy.css"),
  caliente: () => import("../styles/piece/caliente.css"),
  california: () => import("../styles/piece/california.css"),
  cardinal: () => import("../styles/piece/cardinal.css"),
  cburnett: () => import("../styles/piece/cburnett.css"),
  celtic: () => import("../styles/piece/celtic.css"),
  chess7: () => import("../styles/piece/chess7.css"),
  chessnut: () => import("../styles/piece/chessnut.css"),
  companion: () => import("../styles/piece/companion.css"),
  cooke: () => import("../styles/piece/cooke.css"),
  dubrovny: () => import("../styles/piece/dubrovny.css"),
  fantasy: () => import("../styles/piece/fantasy.css"),
  firi: () => import("../styles/piece/firi.css"),
  fresca: () => import("../styles/piece/fresca.css"),
  gioco: () => import("../styles/piece/gioco.css"),
  governor: () => import("../styles/piece/governor.css"),
  horsey: () => import("../styles/piece/horsey.css"),
  icpieces: () => import("../styles/piece/icpieces.css"),
  "kiwen-suwi": () => import("../styles/piece/kiwen-suwi.css"),
  kosal: () => import("../styles/piece/kosal.css"),
  leipzig: () => import("../styles/piece/leipzig.css"),
  letter: () => import("../styles/piece/letter.css"),
  libra: () => import("../styles/piece/libra.css"),
  maestro: () => import("../styles/piece/maestro.css"),
  merida: () => import("../styles/piece/merida.css"),
  monarchy: () => import("../styles/piece/monarchy.css"),
  mono: () => import("../styles/piece/mono.css"),
  mpchess: () => import("../styles/piece/mpchess.css"),
  pirouetti: () => import("../styles/piece/pirouetti.css"),
  pixel: () => import("../styles/piece/pixel.css"),
  reillycraig: () => import("../styles/piece/reillycraig.css"),
  rhosgfx: () => import("../styles/piece/rhosgfx.css"),
  riohacha: () => import("../styles/piece/riohacha.css"),
  shapes: () => import("../styles/piece/shapes.css"),
  spatial: () => import("../styles/piece/spatial.css"),
  staunty: () => import("../styles/piece/staunty.css"),
  tatiana: () => import("../styles/piece/tatiana.css"),
  xkcd: () => import("../styles/piece/xkcd.css"),
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
