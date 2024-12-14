import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../components/home/TrainerForm";
import combineEvalAndMisplays from "../utils/processing/combineEvalAndMisplays";
import { extractErrors } from "../utils/processing/extractErrors";
import { API_BASE_URL } from "../constants";
import { Form } from "../types/form";
import { Game } from "../types/game";

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Form.Fields>({
    username: "JamariTheGreat",
    maxNoGames: 10,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { username, maxNoGames, startDate, endDate } = formData;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (!(username && maxNoGames > 0 && startDate && endDate)) {
      alert("Please fill in all fields correctly");
      return;
    }

    if (start > end) {
      alert("Start date must be before end date.");
      return;
    }

    try {
      const url = `${API_BASE_URL}games/user/${username}?since=${start.getTime()}&until=${end.getTime()}&max=${maxNoGames}&evals=true&analysed=true`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/x-ndjson",
        },
      });

      if (!response.ok) {
        console.error(`Error ${response.status}: ${response.statusText}`);
        return;
      }

      const parsedPuzzleData = await extractErrors(response);

      if (!parsedPuzzleData) return;

      const puzzles = combineEvalAndMisplays(
        username,
        parsedPuzzleData.misplayInfo as Game.LichessResponse[],
        parsedPuzzleData.moveEvaluations
      );
      console.log("Result", puzzles);

      navigate("/train", { state: { puzzles } });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <TrainerForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default Home;
