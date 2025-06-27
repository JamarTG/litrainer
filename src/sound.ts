import { Chess } from "chess.js";

type SoundKey = "move" | "capture" | "check" | "castle" | "promotion" | "checkmate" | "select";

type SoundPath =
  | "/sounds/move.mp3"
  | "/sounds/capture.webm"
  | "/sounds/check.webm"
  | "/sounds/castle.webm"
  | "/sounds/promotion.webm"
  | "/sounds/checkmate.webm"
  | "/sounds/select.mp3";

const soundPaths: Record<SoundKey, SoundPath> = {
  move: "/sounds/move.mp3",
  capture: "/sounds/capture.webm",
  check: "/sounds/check.webm",
  castle: "/sounds/castle.webm",
  promotion: "/sounds/promotion.webm",
  checkmate: "/sounds/checkmate.webm",
  select: "/sounds/select.mp3"
};

const sounds = Object.fromEntries(Object.entries(soundPaths).map(([key, path]) => [key, new Audio(path)]));

function preloadSounds() {
  const loadSound = (sound: HTMLAudioElement) => sound.load();
  Object.values(sounds).forEach(loadSound);
}

const getMoveType = (chess: Chess): SoundKey => {
  const lastMove = chess.history({ verbose: true }).slice(-1)[0];
  if (!lastMove) return "move";
  if (chess.isCheckmate()) return "checkmate";
  if (lastMove.captured) return "capture";
  if (lastMove.flags.includes("k") || lastMove.flags.includes("q")) return "castle";
  if (lastMove.promotion) return "promotion";
  if (chess.isCheck()) return "check";
  return "move";
};

function playSound(chess: Chess): void {
  const moveType = getMoveType(chess);
  const sound = sounds[moveType];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch((error) => console.error(`Failed to play ${moveType} sound:`, error));
}

function playSelectSound(): void {
  const sound = sounds["select"];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch((error) => console.error("Failed to play select sound:", error));
}

preloadSounds();

export { playSound, playSelectSound };
