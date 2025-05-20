import { decodeLichessGameResponse } from "../lib/lichess/parsers";

export const fetchAndParseLichessGames = async (
  lichessUsername: string,
  startTimeEpochMillis: string,
  endTimeEpochMillis: string,
  maximumNumberOfGamesToFetch: string,
  sortOrderChronologicalOrReverse: string,
  playerPerspectiveColor: string,
  preferredGameSpeedCategories: string[]
) => {
  const lichessUserGamesAPIURL = new URL(`https://lichess.org/api/games/user/${lichessUsername}`);

  lichessUserGamesAPIURL.searchParams.append("since", startTimeEpochMillis);
  lichessUserGamesAPIURL.searchParams.append("until", endTimeEpochMillis);
  lichessUserGamesAPIURL.searchParams.append("max", maximumNumberOfGamesToFetch);
  lichessUserGamesAPIURL.searchParams.append("sort", sortOrderChronologicalOrReverse);
  lichessUserGamesAPIURL.searchParams.append("color", playerPerspectiveColor);
  lichessUserGamesAPIURL.searchParams.append("perfType", preferredGameSpeedCategories.join(","));
  lichessUserGamesAPIURL.searchParams.append("evals", "true");
  lichessUserGamesAPIURL.searchParams.append("analysed", "true");
  lichessUserGamesAPIURL.searchParams.append("division", "true");
  lichessUserGamesAPIURL.searchParams.append("finished", "true");
  lichessUserGamesAPIURL.searchParams.append("opening", "true");

  const lichessApiRequestInitOptions: RequestInit = {
    headers: {
      Accept: "application/x-ndjson",
    },
  };
  const lichessUserGamesApiResponse = await fetch(lichessUserGamesAPIURL, lichessApiRequestInitOptions);

  if (!lichessUserGamesApiResponse.ok)
    throw new Error(`Error ${lichessUserGamesApiResponse.status}: ${lichessUserGamesApiResponse.statusText}`);

  const puzzlesFromLichessUserGames = await decodeLichessGameResponse(lichessUserGamesApiResponse);
  if (!puzzlesFromLichessUserGames) throw new Error("No puzzle created from specified params");

  return puzzlesFromLichessUserGames;
};
