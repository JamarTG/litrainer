import { Chess, Move } from "chess.js"; // Adjust the import path as necessary

const sounds: { [key: string]: HTMLAudioElement } = {
  move: new Audio("/sound/move.webm"),
  capture: new Audio("/sound/capture.webm"),
  check: new Audio("/sound/check.webm"),
  castle: new Audio("/sound/castle.webm"),
  promotion: new Audio("/sound/promotion.webm"),
};

function preloadSounds(): void {
  Object.values(sounds).forEach((sound) => {
    sound.addEventListener('canplaythrough', () => {
      console.log(`${sound.src} is ready to play`);
    }, { once: true });
    sound.load();
  });
}

function playSound(chess: Chess, move: Move): void {
  let soundKey: string;

  if (move.captured) {
    soundKey = "capture";
  } else if (move.flags.includes("k") || move.flags.includes("q")) {
    soundKey = "castle";
  } else if (move.promotion) {
    soundKey = "promotion";
  } else if (chess.isCheck()) {
    soundKey = "check";
  } else {
    soundKey = "move";
  }

  const sound = sounds[soundKey];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(error => console.error(`Failed to play sound: ${error}`));
  } else {
    console.error(`Sound ${soundKey} not found`);
  }
}

preloadSounds();

export { playSound };