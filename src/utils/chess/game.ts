import { Chess } from 'chess.js'

export const convertLanToSan = (fen: string, lanMove: string) => {
  try {
    const tempGame = new Chess(fen)
    const move = tempGame.move(lanMove)
    return move ? move.san : lanMove
  } catch (error) {
    console.error('Error converting LAN to SAN:', error)
    return lanMove
  }
}

// THIS FUNCTION IS RESERVED FOR LATER IMPLEMENTATION OF BRILLIANT MOVE

// import { Chess, Square } from "chess.js";
// import { PIECE_VALUE } from "../../constants/piece";

// export const isPieceSacrifice = (fen: string, move: string): boolean => {
//   const game = new Chess(fen);

//   const pieceSquare = move.slice(0, 2);
//   const attackers = game.moves({ verbose: true }).filter((m) => m.to === pieceSquare && m.color !== game.turn());

//   for (const attacker of attackers) {
//     if (PIECE_VALUE[attacker.piece] < PIECE_VALUE[game.get(pieceSquare as Square)?.type ?? ""]) {
//       return false;
//     }
//   }

//   const protectors = game.moves({ verbose: true }).filter((m) => m.to === pieceSquare && m.color === game.turn());

//   if (attackers.length > 0 && protectors.length === 0) {
//     return false;
//   }

//   if (game.inCheck()) {
//     return false;
//   }

//   const moveObj = game.move(move);
//   if (!moveObj) return false; // invalid move

//   if (moveObj.captured && PIECE_VALUE[moveObj.captured] >= PIECE_VALUE[moveObj.piece]) {
//     return false;
//   }

//   const opponentMoves = game.moves({ verbose: true });
//   for (const opponentMove of opponentMoves) {
//     if (!opponentMove.captured) {
//       continue;
//     }

//     const gameAfterOpponentMove = new Chess(game.fen());
//     gameAfterOpponentMove.move(opponentMove.san);
//     const ourMoves = gameAfterOpponentMove.moves({ verbose: true });

//     let canRegainMaterial = false;
//     for (const ourMove of ourMoves) {
//       if (
//         ourMove.captured &&
//         PIECE_VALUE[ourMove.captured] + (moveObj.captured ? PIECE_VALUE[moveObj.captured] : 0) >= PIECE_VALUE[opponentMove.captured]
//       ) {
//         canRegainMaterial = true;
//         break;
//       }
//     }

//     if (!canRegainMaterial) {
//       return true;
//     }
//   }

//   return false;
// };
