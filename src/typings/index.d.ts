export namespace Models {
  namespace Move {
    
    type Severity = "Inaccuracy" | "Blunder" | "Mistake";

    
    interface Info {
      move: string;
      evaluation: Evaluation;
      fenBeforeOpponentMove: string;
      fenAfterOpponentMove: string;
      colorToPlay: string;
      players: Player.ChessPlayers;
      game_id: string;
      perf: string;
      rated: boolean;
      status: string;
      variant: string;
      lastMove: string;
      clock : Game.Clock;
    }

    
    interface Judgement {
      name: Severity;
      comment: string;
    }

    
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
    export interface LichessGameInfo {
      players: Player.ChessPlayers;
      moves: string;
      game_id: string;
      fen :string;
      perf: string;
      rated: boolean;
      status: string;
      variant: string;
      clock : Clock;
    }

    export interface Clock {
      increment: number;
      initial: number;
      totalTime: number;
    }

  }

  
  namespace Player {
    interface ChessPlayerInfo {
      rating: number;
      user: {
        name: string;
        flair: string;
        title?: string;
        patron?: boolean;
      };
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
