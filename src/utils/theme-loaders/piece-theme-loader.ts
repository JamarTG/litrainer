const pieceSets = new Set([
  "alpha",
  "anarcandy",
  "caliente",
  "california",
  "cardinal",
  "cburnett",
  "celtic",
  "chess7",
  "chessnut",
  "companion",
  "cooke",
  "dubrovny",
  "fantasy",
  "firi",
  "fresca",
  "gioco",
  "governor",
  "horsey",
  "icpieces",
  "kiwen-suwi",
  "kosal",
  "leipzig",
  "letter",
  "libra",
  "maestro",
  "merida",
  "monarchy",
  "mono",
  "mpchess",
  "pirouetti",
  "pixel",
  "reillycraig",
  "rhosgfx",
  "riohacha",
  "shapes",
  "spatial",
  "staunty",
  "tatiana",
  "xkcd"
]);

const THEME_STYLE_ID = "chess-piece-theme";
let currentSet: string | null = null;

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

const generateThemeCSS = (pieceSet: string): string => {
  return pieceSelectors
    .map((selector, index) => {
      const pieceFile = pieceFiles[index];
      return `${selector} { background-image: url("/themes/pieces/${pieceSet}/${pieceFile}.svg"); }`;
    })
    .join("\n");
};

export const loadPieceSetCSS = async (pieceSet: string): Promise<void> => {
  if (currentSet === pieceSet) {
    return;
  }

  try {
    if (!pieceSets.has(pieceSet)) {
      console.warn(`Piece set "${pieceSet}" not found`);
      return;
    }

    const existingStyle = document.getElementById(THEME_STYLE_ID);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement("style");
    styleElement.id = THEME_STYLE_ID;
    styleElement.textContent = generateThemeCSS(pieceSet);
    document.head.appendChild(styleElement);

    currentSet = pieceSet;
    console.log(`"${pieceSet}" piece set applied`);
  } catch (error) {
    console.error(`Failed to load: "${pieceSet} piece set"`, error);
    throw error;
  }
};

export const getCurrentPieceSet = (): string | null => {
  return currentSet;
};

export const isPieceSetAvailable = (themeName: string): boolean => {
  return pieceSets.has(themeName);
};
