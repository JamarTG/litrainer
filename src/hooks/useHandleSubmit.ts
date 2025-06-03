import { useNavigate } from "react-router-dom";
import { Fields } from "@/types/form";
import { fetchAndParseLichessGames } from "@/api/lichess-api";
import { LichessGameResponse } from "@/types/response";
import { LichessEvaluation } from "@/types/eval";
import { toast } from "react-hot-toast";
import { MouseEvent } from "react";
import generatePuzzles from "@/libs/lichess/parsers";
import { dateRangeToEpochMillis, validateDateRange } from "@/utils/date";
import { saveToLocalStorage } from "@/utils/storage";

const useSubmitHandler = (formData: Fields) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let { maxNoGames, color, sort } = formData;
    const { username, startDate, endDate, gameTypes } = formData;

    if (gameTypes.length === 0) {
      toast.error("Please select at least one game type.");
      return;
    }

    maxNoGames = maxNoGames || 10;
    color = color || "both";
    sort = sort || "desc";

    const { isDateRangeValid, normalizedStartDate, normalizedEndDate } = validateDateRange(startDate, endDate);

    if (!isDateRangeValid) {
      toast.error("Invalid date range.");
      return;
    }

    const { startTimeEpochMillis, endTimeEpochMillis } = dateRangeToEpochMillis(normalizedStartDate, normalizedEndDate);

    try {
      const { games, evaluations } = await fetchAndParseLichessGames(
        username,
        startTimeEpochMillis,
        endTimeEpochMillis,
        maxNoGames.toString(),
        sort,
        color,
        gameTypes
      );

      const puzzles = generatePuzzles(
        username,
        games as LichessGameResponse[],
        evaluations as unknown as LichessEvaluation[][]
      );

      if (puzzles.length === 0) {
        toast.error(`No errors found for ${username} based on the given criteria`);
        return;
      }

      saveToLocalStorage("puzzle", puzzles);

      toast.success(`Found ${puzzles.length} puzzles for ${username}`);
      navigate("/", { state: { puzzles } });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  return handleSubmit;
};

export default useSubmitHandler;
