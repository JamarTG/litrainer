export enum EngineName {
  Stockfish17SingleThreaded = "stockfish_17_single",
  Stockfish17LiteSingleThreaded = "stockfish_17_lite_single",
  Stockfish17LiteMultiThreaded = "stockfish_17_lite_multi"
}


export enum MoveClassification {
  blunder = "blunder",
  mistake = "mistake",
  inaccuracy = "inaccuracy",
  good = "good",
  excellent = "excellent",
  best = "best",
  book = "book",
  great = "great"
}

export enum ColorLongForm {
  WHITE = "white",
  BLACK = "black"
}

export enum ColorShortForm {
  WHITE = "w",
  BLACK = "b"
}

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
