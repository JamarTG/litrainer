import { useNavigate } from "react-router-dom";
import { getLichessGames } from "@/libs/lichess/api";
import { toast } from "react-hot-toast";
import { MouseEvent } from "react";
import generatePuzzles from "@/libs/lichess/parsers";
import { dateRangeToEpochMillis, validateDateRange } from "@/libs/lichess/date";
import { saveToLocalStorage } from "@/utils/storage";
import { Fields, LichessEvaluation, LichessGameResponse } from "@/types/lichess";

const useSubmitHandler = (formData: Fields) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { maxNoGames = 10, color = "both", sort = "desc" } = formData;
    const { username, startDate, endDate, gameTypes } = formData;

    if (gameTypes.length === 0) {
      toast.error("Please select at least one game type.");
      return;
    }

    const { isDateRangeValid, normalizedStartDate, normalizedEndDate } = validateDateRange(startDate, endDate);

    if (!isDateRangeValid) {
      toast.error("Invalid date range.");
      return;
    }

    const { startTimeEpochMillis, endTimeEpochMillis } = dateRangeToEpochMillis(normalizedStartDate, normalizedEndDate);

    try {
      const result = await getLichessGames({
        username,
        since: startTimeEpochMillis,
        until: endTimeEpochMillis,
        max: maxNoGames.toString(),
        sort,
        color,
        perfType: gameTypes
      });

      const puzzles = generatePuzzles(
        username,
        result?.games as LichessGameResponse[],
        result?.evaluations as unknown as LichessEvaluation[][]
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
