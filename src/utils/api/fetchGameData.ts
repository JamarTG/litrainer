import { API_BASE_URL } from "../../constants";
import { Models } from "../../typings";
import { extractErrors } from "../processing/extractErrors";


export const fetchGameData = async (
  username: string,
  start: Date,
  end: Date,
  maxNoGames: number
): Promise<{ misplayInfo: Models.Game.LichessGameInfo[], moveEvaluations: Models.Move.Evaluation[][] } | null> => {
  const url = `${API_BASE_URL}games/user/${username}?since=${start.getTime()}&until=${end.getTime()}&max=${maxNoGames}&evals=true&analysed=true`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/x-ndjson",
    },
  });

  if (!response.ok) {
    console.error(`Error ${response.status}: ${response.statusText}`);
    return null;
  }

  const parsedPuzzleData = await extractErrors(response);

  if (!parsedPuzzleData) return null;

  return {
    misplayInfo: parsedPuzzleData.misplayInfo as Models.Game.LichessGameInfo[],
    moveEvaluations: parsedPuzzleData.moveEvaluations
  };
};