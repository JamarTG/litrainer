export namespace Models {
  namespace Move {
    // resolved
    type Severity = "Inaccuracy" | "Blunder" | "Mistake";

    // resolved
    interface Info {
      move: string;
      evaluation: Evaluation;
      fen: string;
      colorToPlay: string;
      players: Player.ChessPlayers;
      game_id: string;
      perf: string;
      rated: boolean;
      status: string;
      variant: string;
    }

    // resolved
    interface Judgement {
      name: Severity;
      comment: string;
    }

    // resolved
    interface Evaluation {
      eval: number;
      best?: string;
      variation?: string;
      judgment: Judgement;
    }

    export interface Index {
      x: number;
      y: number;
    }
  }

  namespace Game {
    // type these later
    // resolved
    export interface LichessGameInfo {
      players: Player.ChessPlayers;
      moves: string;
      game_id: string;
      fen :string;
      perf: string;
      rated: boolean;
      status: string;
      variant: string;
    }
  }

  // resolved
  namespace Player {
    interface ChessPlayerInfo {
      rating: number;
      user: string
    }

    interface ChessPlayers {
      white: ChessPlayerInfo;
      black: ChessPlayerInfo;
    }
  }

  namespace Form {
    export interface FormData {
      username: string;
      maxNoGames: number;
      startDate: string;
      endDate: string;
    }
  }
}
