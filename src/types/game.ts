import { Player } from "./player";

export namespace Game {
  export interface Evaluation {
    eval: number;
    best?: string;
    variation?: string;
    judgment: {
      name: "Inaccuracy" | "Blunder" | "Mistake";
      comment: string;
    };
  };

  export interface LichessResponse{
    players: Player.Players;
    moves: string;
    game_id: string;
    fen :string;
    perf: string;
    rated: boolean;
    status: string;
    variant: string;
    clock : { increment: number; initial: number; totalTime: number };
  }

  export interface Info {
    move: string;
    evaluation:Evaluation,
    fenBeforeOpponentMove: string;
    fenAfterOpponentMove: string;
    colorToPlay: string;
    players: Player.Players;
    game_id: string;
    perf: string;
    rated: boolean;
    status: string;
    variant: string;
    lastMove: string;
    clock: { increment: number; initial: number; totalTime: number };
  }

  export interface Index {
    x: number;
    y: number;
  }
}
