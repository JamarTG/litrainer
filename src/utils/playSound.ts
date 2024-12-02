import { Chess, Move } from "chess.js";

export const playVariationSound = (game: Chess, move: Move) => {
  //   capture
  const isCapture = move.captured;
  // checks
  const isCheck = game.isCheck();
  // regular moves

  if (isCapture) {
    new Audio("/sounds/capture.mp3").play();
    return;
  }

  if (isCheck) {
    new Audio("/sounds/check.mp3").play();
    return;
  }

  new Audio("/sounds/move.mp3").play();
};

export const playGameSound = (isMoveGood: boolean) => {
  const sound = new Audio(`/sounds/${isMoveGood ? "good" : "bad"}-move.mp3`);
  sound.play();
};
