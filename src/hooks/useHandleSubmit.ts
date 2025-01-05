import { useNavigate } from "react-router-dom";
import createPuzzles, { parseLichessResponse } from "../utils/lichess";
import { LichessGameResponse } from "../types/response";
import { LichessEvaluation } from "../types/eval";
import {
  atLeastOneGameType,
  checkUserExists,
  getTimeRange,
  setDefaultColor,
  setDefaultMaxNoGames,
  setDefaultSort,
  validateDates,
} from "../utils/validation";
import { Fields, Color } from "../types/form";

const useHandleSubmit = (formData: Fields) => {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let {
      username,
      maxNoGames,
      startDate,
      endDate,
      gameTypes,
      color: colorString,
      sort,
    } = formData;

    console.log(formData, "formData");
    let color: Color;

    if (!checkUserExists(username)) {
      alert("User Not Found");
      return;
    }

    if (!atLeastOneGameType(gameTypes)) {
      alert("Game Type Not Selected");
      return;
    }

    maxNoGames = setDefaultMaxNoGames(maxNoGames);
    color = setDefaultColor(colorString);
    sort = setDefaultSort(sort);

    const {
      valid,
      startDate: validatedStartDate,
      endDate: validatedEndDate,
    } = validateDates(startDate, endDate);

    if (!valid) {
      alert("Invalid Dates");
      return;
    }

    const { since, until } = getTimeRange(validatedStartDate, validatedEndDate);

    try {
      const url = new URL(`https://lichess.org/api/games/user/${username}`);

      url.searchParams.append("since", since);
      url.searchParams.append("until", until);
      url.searchParams.append("max", maxNoGames.toString());
      url.searchParams.append("sort", sort == "asc" ? "dateAsc" : "dateDesc");
      url.searchParams.append("color", color);
      gameTypes.forEach((type: string) =>
        url.searchParams.append("perfType", type)
      );
      url.searchParams.append("evals", "true");
      url.searchParams.append("analysed", "true");

      const response = await fetch(url, {
        headers: {
          Accept: "application/x-ndjson",
        },
      });

      if (!response.ok) {
        console.error(`Error ${response.status}: ${response.statusText}`);
        return;
      }

      const parsedPuzzleData = await parseLichessResponse(response);

      if (!parsedPuzzleData) {
        alert("No games found for the given criteria");
        return;
      }

      const puzzles = createPuzzles(
        username,
        parsedPuzzleData.games as LichessGameResponse[],
        parsedPuzzleData.evaluations as LichessEvaluation[][]
      );

      if (puzzles.length === 0) {
        alert("Unable to create puzzles from data");
        return;
      } else {
        localStorage.setItem("puzzles", JSON.stringify(puzzles));
        // alert(`Fetched ${puzzles.length} games`);
      }
      
      navigate("/train", { state: { puzzles } });
      // window.location.reload();
    } catch (error) {
      alert(`Error fetching games for ${username}`);
    }
  };

  return handleSubmit;
};

export default useHandleSubmit;
