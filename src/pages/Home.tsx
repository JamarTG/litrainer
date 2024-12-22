import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../components/home/TrainerForm";
import combineEvalAndMisplays from "../utils/processing/combineEvalAndMisplays";
import { extractErrors } from "../utils/processing/extractErrors";
import { API_BASE_URL } from "../constants";
import { Fields } from "../types/form";
import LoadingScreen from "../components/loader";
import { LichessGameResponse } from "../types/response";


const Home: React.FC = () => {
  const [formData, setFormData] = useState<Fields>({
    username: "JamariTheGreat",
    maxNoGames: 10,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  });
  const [loading, setLoading] = useState<boolean>(false);
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

    setLoading(true);

    try {
      const url = `${API_BASE_URL}games/user/${username}?since=${start.getTime()}&until=${end.getTime()}&max=${maxNoGames}&evals=true&analysed=true`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/x-ndjson",
        },
      });

      if (!response.ok) {
        console.error(`Error ${response.status}: ${response.statusText}`);
        setLoading(false);
        return;
      }

      const parsedPuzzleData = await extractErrors(response);

      if (!parsedPuzzleData) {
        setLoading(false);
        return;
      }

      const puzzles = combineEvalAndMisplays(
        username,
        parsedPuzzleData.misplayInfo as LichessGameResponse[],
        parsedPuzzleData.moveEvaluations
      );
      console.log("Result", puzzles);

      navigate("/train", { state: { puzzles } });
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-violet-100 h-full">
      {loading ? (
        <LoadingScreen />
      ) : (
        <TrainerForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Home;
