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

interface LichessUserMetaData {
  name: string;
  flair: string;
  title?: string;
  patron?: boolean;
}
