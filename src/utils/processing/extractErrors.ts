import { LichessGameResponse } from "../../types/response";

export const extractErrors = async (response: Response) => {
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

  const lines = result.split("\n").filter((line) => line.trim() !== "");

  const moveEvaluations: any = lines.map((line) => JSON.parse(line).analysis);

  const misplayInfo: LichessGameResponse[] = lines.map((line) => {
    const parsedLine = JSON.parse(line);

    return {
      players: parsedLine.players,
      moves: parsedLine.moves,
      game_id: parsedLine.id,
      fen: parsedLine.fen,
      perf: parsedLine.perf,
      rated: parsedLine.rated,
      status: parsedLine.status,
      variant: parsedLine.variant,
      clock: parsedLine.clock,
    };
  });

  return { moveEvaluations, misplayInfo };
};
