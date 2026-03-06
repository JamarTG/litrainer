import { useNavigate } from "react-router-dom";
import { generatePuzzles, getLichessGames } from "@/services/lichess";
import { toast } from "react-hot-toast";
import { MouseEvent } from "react";
import { dateRangeToEpochMillis, validateDateRange } from "@/services/lichess";
import { saveToLocalStorage } from "@/utils/storage";
import { PUZZLE_STORAGE_KEY, PUZZLE_INDEX_STORAGE_KEY, PUZZLE_INDEX_STORAGE_FALLBACK } from "@/constants/storage";
import { Fields, LichessEvaluation, LichessGameResponse } from "@/typing/interfaces";

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

      // Persist new puzzles and reset the stored puzzle index to the beginning
      saveToLocalStorage(PUZZLE_STORAGE_KEY, puzzles);
      saveToLocalStorage(PUZZLE_INDEX_STORAGE_KEY, PUZZLE_INDEX_STORAGE_FALLBACK);

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
