export interface LichessPlayers {
  white: LichessPlayer;
  black: LichessPlayer;
}

export interface LichessPlayer {
  rating: number;
  ratingDiff: number;
  user: LichessUserMetaData;
  provisional?: boolean;
}

export type ColorLongForm = "white" | "black";

interface LichessUserMetaData {
  name: string;
  flair: string;
  title?: string;
  patron?: boolean;
}
