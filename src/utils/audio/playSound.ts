import { Chess, Move } from "chess.js";
import { DEFAULT_VOLUME } from "../../constants";

export const playSound = (chessGame: Chess, chessMove: Move) => {
  
  let soundAction = "move";

  switch (true) {
  case !!chessMove.captured:
  soundAction = "capture";
  break;
  case chessGame.isCheck():
  soundAction = "check";
  break;
  case chessMove.flags.includes("k") || chessMove.flags.includes("q"):
  soundAction = "castle";
  break;
  }

  const sound = new Audio(`/sounds/${soundAction}.mp3`);
  
  sound.volume = DEFAULT_VOLUME;
  sound.play();
};
