import { Chess, Move } from "chess.js"; 

const sounds: { [key: string]: HTMLAudioElement } = {
  move: new Audio("assets/sound/move.mp3"),
  capture: new Audio("assets/sound/capture.webm"),
  check: new Audio("assets/sound/check.webm"),
  castle: new Audio("assets/sound/castle.webm"),
  promotion: new Audio("assets/sound/promotion.webm"),
  checkmate: new Audio("assets/sound/checkmate.webm"),
};

function preloadSounds(): void {
  Object.values(sounds).forEach((sound) => {
    sound.addEventListener('canplaythrough', () => {}, { once: true });
    sound.load();
  });
}

function playSound(chess: Chess, move: Move): void {
  const moveType = getMoveType(chess, move);
  const sound = sounds[moveType];

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(error => console.error(`Failed to play sound: ${error}`));
  }
}

function getMoveType(chess: Chess, move: Move): keyof typeof sounds {
  if (chess.isCheckmate()) return "checkmate";
  if (move.captured) return "capture";
  if (move.flags.includes("k") || move.flags.includes("q")) return "castle";
  if (move.promotion) return "promotion";
  if (chess.isCheck()) return "check";
  return "move";
}

preloadSounds();

export { playSound };