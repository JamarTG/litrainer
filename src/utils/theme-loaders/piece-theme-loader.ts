const themeModules = {
  alpha: () => import("@/styles/piece/alpha.css"),
  anarcandy: () => import("@/styles/piece/anarcandy.css"),
  caliente: () => import("@/styles/piece/caliente.css"),
  california: () => import("@/styles/piece/california.css"),
  cardinal: () => import("@/styles/piece/cardinal.css"),
  cburnett: () => import("@/styles/piece/cburnett.css"),
  celtic: () => import("@/styles/piece/celtic.css"),
  chess7: () => import("@/styles/piece/chess7.css"),
  chessnut: () => import("@/styles/piece/chessnut.css"),
  companion: () => import("@/styles/piece/companion.css"),
  cooke: () => import("@/styles/piece/cooke.css"),
  dubrovny: () => import("@/styles/piece/dubrovny.css"),
  fantasy: () => import("@/styles/piece/fantasy.css"),
  firi: () => import("@/styles/piece/firi.css"),
  fresca: () => import("@/styles/piece/fresca.css"),
  gioco: () => import("@/styles/piece/gioco.css"),
  governor: () => import("@/styles/piece/governor.css"),
  horsey: () => import("@/styles/piece/horsey.css"),
  icpieces: () => import("@/styles/piece/icpieces.css"),
  "kiwen-suwi": () => import("@/styles/piece/kiwen-suwi.css"),
  kosal: () => import("@/styles/piece/kosal.css"),
  leipzig: () => import("@/styles/piece/leipzig.css"),
  letter: () => import("@/styles/piece/letter.css"),
  libra: () => import("@/styles/piece/libra.css"),
  maestro: () => import("@/styles/piece/maestro.css"),
  merida: () => import("@/styles/piece/merida.css"),
  monarchy: () => import("@/styles/piece/monarchy.css"),
  mono: () => import("@/styles/piece/mono.css"),
  mpchess: () => import("@/styles/piece/mpchess.css"),
  pirouetti: () => import("@/styles/piece/pirouetti.css"),
  pixel: () => import("@/styles/piece/pixel.css"),
  reillycraig: () => import("@/styles/piece/reillycraig.css"),
  rhosgfx: () => import("@/styles/piece/rhosgfx.css"),
  riohacha: () => import("@/styles/piece/riohacha.css"),
  shapes: () => import("@/styles/piece/shapes.css"),
  spatial: () => import("@/styles/piece/spatial.css"),
  staunty: () => import("@/styles/piece/staunty.css"),
  tatiana: () => import("@/styles/piece/tatiana.css"),
  xkcd: () => import("@/styles/piece/xkcd.css")
};

const THEME_STYLE_ID = "chess-piece-theme";
let currentTheme: string | null = null;

const pieceSelectors = [
  ".cg-wrap piece.pawn.white",
  ".cg-wrap piece.rook.white",
  ".cg-wrap piece.knight.white",
  ".cg-wrap piece.bishop.white",
  ".cg-wrap piece.queen.white",
  ".cg-wrap piece.king.white",
  ".cg-wrap piece.pawn.black",
  ".cg-wrap piece.rook.black",
  ".cg-wrap piece.knight.black",
  ".cg-wrap piece.bishop.black",
  ".cg-wrap piece.queen.black",
  ".cg-wrap piece.king.black"
];

const pieceFiles = ["wP", "wR", "wN", "wB", "wQ", "wK", "bP", "bR", "bN", "bB", "bQ", "bK"];

const generateThemeCSS = (themeName: string): string => {
  return pieceSelectors
    .map((selector, index) => {
      const pieceFile = pieceFiles[index];
      return `${selector} { background-image: url("/themes/pieces/${themeName}/${pieceFile}.svg"); }`;
    })
    .join("\n");
};

export const loadThemeCSS = async (themeName: string): Promise<void> => {
  if (currentTheme === themeName) {
    return;
  }

  try {
    if (!themeModules[themeName as keyof typeof themeModules]) {
      console.warn(`Theme "${themeName}" not found in themeModules`);
      return;
    }

    const existingStyle = document.getElementById(THEME_STYLE_ID);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement("style");
    styleElement.id = THEME_STYLE_ID;
    styleElement.textContent = generateThemeCSS(themeName);
    document.head.appendChild(styleElement);

    currentTheme = themeName;
    console.log(`Theme "${themeName}" applied`);
  } catch (error) {
    console.error(`Failed to load theme: "${themeName}"`, error);
    throw error;
  }
};

export const getCurrentTheme = (): string | null => {
  return currentTheme;
};

export const availableThemes = Object.keys(themeModules);

export const isThemeAvailable = (themeName: string): boolean => {
  return themeName in themeModules;
};
