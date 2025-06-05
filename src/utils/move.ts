import { Chess } from "chess.js";

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
