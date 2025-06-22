import { LICHESS_URLS } from "@/constants/urls";
import { parseGames } from "@/libs/lichess/parsers";

type QueryOptions = {
  username: string;
  since: string;
  until: string;
  max: string;
  sort: string;
  color: string;
  perfType: string[];
};

export const getLichessGames = async (queryOptions: QueryOptions) => {
  const url = new URL(LICHESS_URLS.GamesAPI + queryOptions.username);
  const params = url.searchParams;

  params.append("since", queryOptions.since);
  params.append("until", queryOptions.until);
  params.append("max", queryOptions.max);
  params.append("sort", queryOptions.sort);
  params.append("color", queryOptions.color);
  params.append("perfType", queryOptions.perfType.join(","));
  params.append("evals", "true");
  params.append("analysed", "true");
  params.append("division", "true");
  params.append("finished", "true");
  params.append("opening", "true");

  const response = await fetch(url, {
    headers: {
      Accept: "application/x-ndjson"
    }
  });

  if (!response.ok) throw new Error(`Response status: ${response}`);

  const games = await parseGames(response);
  if (!games) throw new Error("No games for those params");

  return games;
};
