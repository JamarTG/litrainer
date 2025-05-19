import { Chess } from "chess.js";

type SoundKey = "move" | "capture" | "check" | "castle" | "promotion" | "checkmate";

const soundPaths: Record<string, string> = {
  move: "/assets/move-sounds/move.mp3",
  capture: "/assets/move-sounds/capture.webm",
  check: "/assets/move-sounds/check.webm",
  castle: "/assets/move-sounds/castle.webm",
  promotion: "/assets/move-sounds/promotion.webm",
  checkmate: "/assets/move-sounds/checkmate.webm",
};

const sounds: Record<keyof typeof soundPaths, HTMLAudioElement> = Object.fromEntries(
  Object.entries(soundPaths).map(([key, path]) => [key, new Audio(path)])
) as Record<keyof typeof soundPaths, HTMLAudioElement>;

function preloadSounds(): void {
  Object.values(sounds).forEach((sound) => {
    sound.load(); 
  });
}



const getMoveType = (chess: Chess): SoundKey => {
  const lastMove = chess.history({ verbose: true }).slice(-1)[0];
  console.log("lastMove", lastMove);
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

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch((error) =>
      console.error(`Failed to play ${moveType} sound:`, error)
    );
  }
}

preloadSounds();

export { playSound };