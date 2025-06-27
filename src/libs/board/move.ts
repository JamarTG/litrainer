import { Chess, Move } from "chess.js";

export const convertLanToSan = (fen: string, lanMove: string) => {
  try {
    const tempGame = new Chess(fen);
    const move = tempGame.move(lanMove);
    return move ? move.san : lanMove;
  } catch (error) {
    console.error("Error converting LAN to SAN:", error);
    return lanMove;
  }
};

export const attemptMove = (
  currentGame: Chess,
  fromSquare: string,
  toSquare: string,
  promotion: string = "q"
): Move | null => {
  try {
    return currentGame.move({ from: fromSquare, to: toSquare, promotion });
  } catch (error) {
    console.error("Invalid move attempt:", error);
    return null;
  }
};
