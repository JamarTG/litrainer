import { parseLichessResponse } from "../lib/lichess/parsers";

export const getLichessGames = async (
  username: string,
  since: string,
  until: string,
  maxNoGames: string,
  sort: string,
  color: string,
  gameTypes: string[]
) => {
  const url = new URL(`https://lichess.org/api/games/user/${username}`);

  url.searchParams.append("since", since);
  url.searchParams.append("until", until);
  url.searchParams.append("max", maxNoGames);
  url.searchParams.append("sort", sort);
  url.searchParams.append("color", color);
  url.searchParams.append("perfType", gameTypes.join(","));
  url.searchParams.append("evals", "true");
  url.searchParams.append("analysed", "true");
  url.searchParams.append("division", "true");
  url.searchParams.append("finished", "true");
  url.searchParams.append("opening", "true");

  const response = await fetch(url, {
    headers: {
      Accept: "application/x-ndjson",
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const parsedPuzzleData = await parseLichessResponse(response);

  if (!parsedPuzzleData) {
    throw new Error("No games found for the given criteria");
  }

  return parsedPuzzleData;
};
