import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../components/home/TrainerForm";
import { Models } from "../typings";
import combineEvalAndMisplays from "../utils/processing/combineEvalAndMisplays";
import { extractErrors } from "../utils/processing/extractErrors";
import { API_BASE_URL } from "../constants";

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Models.Form.FormData>({
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

    // fetchGames - When no games found - we have a no data found set to true
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

      // When no errors found - set no Errors state to true
      if (!parsedPuzzleData) return;

      const puzzles = combineEvalAndMisplays(
        username,
        parsedPuzzleData.misplayInfo as Models.Game.LichessGameInfo[],
        parsedPuzzleData.moveEvaluations
      );
      console.log("Result",puzzles)

      navigate("/train", { state: { puzzles } });

    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <div>
      <TrainerForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
