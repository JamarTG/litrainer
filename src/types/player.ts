export interface LichessPlayers {
  white: LichessPlayer;
  black: LichessPlayer;
}

export interface LichessPlayer {
  rating: number;
  user: LichessUserMetaData;
}

interface LichessUserMetaData {
  name: string;
  flair: string;
  title?: string;
  patron?: boolean;
}