import { Chess, Move } from "chess.js";

export const playSound = (game: Chess, move: Move) => {
  const volume = 0.5; // Set the desired volume level (0.0 to 1.0)

  // Capture
  const isCapture = move.captured;
  // Checks
  const isCheck = game.isCheck();
  // Regular moves

  if (isCapture) {
    const captureSound = new Audio("/sounds/capture.mp3");
    captureSound.volume = volume;
    captureSound.play();
    return;
  }

  if (isCheck) {
    const checkSound = new Audio("/sounds/check.mp3");
    checkSound.volume = volume;
    checkSound.play();
    return;
  }

  const moveSound = new Audio("/sounds/move.mp3");
  moveSound.volume = volume;
  moveSound.play();
};
