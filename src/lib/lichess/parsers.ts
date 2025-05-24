import { Chess, Color } from "chess.js";
import { LichessEvaluation } from "../../types/eval";
import { LichessGameResponse } from "../../types/response";
import { Puzzle } from "../../types/puzzle";
import { GameType } from "../../types/form";

export const decodeLichessGameResponse = async (response: Response) => {
  if (!response.body) {
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let chunk;

  while (!(chunk = await reader.read()).done) {
    const gameInfo = decoder.decode(chunk.value, { stream: true });
    result += gameInfo;
  }

  const unParsedGames = result.split("\n").filter((unParsedGame) => unParsedGame.trim() !== "");
  const evaluations: string[] = unParsedGames.map((unParsedGame) => JSON.parse(unParsedGame).analysis);

  const parsedGames: LichessGameResponse[] = unParsedGames.map((line) => {
    const game = JSON.parse(line);

    return {
      players: game.players,
      moves: game.moves,
      game_id: game.id,
      fen: game.fen,
      perf: game.perf,
      rated: game.rated,
      status: game.status,
      variant: game.variant,
      clock: game.clock,
      winner: game.winner,
      opening: game.opening,
      division: game.division,
    };
  });

  return { evaluations, games: parsedGames };
};

const generatePuzzles = (username: string, games: LichessGameResponse[], evaluations: LichessEvaluation[][]) => {
  const standardGames = games.filter((game) => game.variant === "standard");

  const result = standardGames.flatMap((game, index) => {
  const chessgame = new Chess();
  chessgame.loadPgn(game.moves);

  const history = chessgame.history({ verbose: true });
  const gameEvaluations = evaluations[index];

  // Skip initial evaluation if it corresponds to the starting position
  const trimmedEvaluations = gameEvaluations.length > history.length ? gameEvaluations.slice(1) : gameEvaluations;

  const OPColor = username === game.players.white.user.name ? "w" : "b";

  const res: Puzzle[] = [];

  const middlegameStartPly = game.division?.middle ?? Infinity;
  const endgameStartPly = game.division?.end ?? Infinity;

  for (let i = 0; i < trimmedEvaluations.length && i < history.length; i++) {
    const evaluation = trimmedEvaluations[i];
    const move = history[i];

    if (!evaluation || !move) continue;

    if (evaluation.judgment && move.color === OPColor && i > 0) {
      const plyNumber = i + 1;

      let phase: "opening" | "middlegame" | "endgame";
      if (plyNumber < middlegameStartPly) {
        phase = "opening";
      } else if (plyNumber < endgameStartPly) {
        phase = "middlegame";
      } else {
        phase = "endgame";
      }

      const previousMove = history[i - 1];

      const puzzle: Puzzle = {
        gameId: game.game_id,
        players: game.players,
        opening: game.opening,
        variant: game.variant,
        timeControl: game.perf as GameType,
        status: game.status,
        rated: game.rated,
        clock: game.clock,
        userMove: {
          san: move.san,
          lan: move.lan,
          piece: move.piece,
          color: move.color,
          source: move.from,
          destination: move.to,
        },
        moveNumber: plyNumber,
        opponentMove: {
          san: previousMove.san,
          lan: previousMove.lan,
          piece: previousMove.piece,
          source: previousMove.from,
          destination: previousMove.to,
          color: previousMove.color,
        },
        evaluation,
        fen: {
          current: move.before,
          previous: previousMove.before ?? move.before,
        },
        phase,
      };

      if (game.winner) {
        puzzle.winner = game.winner as Color;
      }

      res.push(puzzle);
    }
  }

  return res;
});
  return result.flat();
};

export default generatePuzzles;
