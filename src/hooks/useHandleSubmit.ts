import { useNavigate } from "react-router-dom";
import { Fields } from "../types/form";
import { validateDates } from "../utils/validation";
import { userExists } from "../utils/user";
import { toTimestamps } from "../utils/time";
import { getLichessGames } from "../utils/api";
import createPuzzles from "../utils/lichess";
import { LichessGameResponse } from "../types/response";
import { LichessEvaluation } from "../types/eval";
import { saveLocal } from "../utils/localStorage";
import { toast } from "react-hot-toast";
import React from "react";

const useSubmitHandler = (formData: Fields) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let { username, maxNoGames, startDate, endDate, gameTypes, color, sort } = formData;

    if (!(await userExists(username))) {
      toast.error("User does not exist.");
      return;
    }

    if (gameTypes.length === 0) {
      toast.error("Please select at least one game type.");
      return;
    }

    
    

    maxNoGames = maxNoGames || 10;
    color = color || "both";
    sort = sort || "desc";

    const { valid, startDate: validatedStart, endDate: validatedEnd } = validateDates(startDate, endDate);
    if (!valid) {
      toast.error("Invalid date range.");
      return;
    }

    const { since, until } = toTimestamps(validatedStart, validatedEnd);

    try {
      const { games, evaluations } = await getLichessGames(username, since, until, maxNoGames.toString(), sort, color, gameTypes);

      
      const puzzles = createPuzzles(username, games as LichessGameResponse[], evaluations as LichessEvaluation[][]);

      if(puzzles.length === 0) {
        toast.error(`No errors found for ${username} based on the given criteria`);
        return
      }

      saveLocal("puzzles", puzzles);
      
    
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
