// Engine

export enum EngineName {
  Stockfish17SingleThreaded = "stockfish_17_single",
  Stockfish17LiteSingleThreaded = "stockfish_17_lite_single",
  Stockfish17LiteMultiThreaded = "stockfish_17_lite_multi"
}

// Classification

export enum MoveClassification {
  Blunder = "Blunder",
  Mistake = "Mistake",
  Inaccuracy = "Inaccuracy",
  Good = "Good",
  Excellent = "Excellent",
  Best = "Best",
  Book = "Book",
  Great = "Great"
}

// Colors
export enum ColorLongForm {
  WHITE = "white",
  BLACK = "black"
}

export enum ColorShortForm {
  WHITE = "w",
  BLACK = "b"
}

// Lichess
export enum GameMode {
  Rated = "Rated",
  Casual = "Casual"
}

export enum GamePhase {
  opening = "opening",
  middlegame = "middlegame",
  endgame = "endgame"
}

export enum Sort {
  desc = "desc",
  asc = "asc"
}

export enum TimeControl {
  bullet = "bullet",
  blitz = "blitz",
  rapid = "rapid",
  classical = "classical",
  correspondence = "correspondence"
}
