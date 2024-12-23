import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../components/home/TrainerForm";
import combineEvalAndMisplays from "../utils/processing/combineEvalAndMisplays";
import { extractErrors } from "../utils/processing/extractErrors";
import { API_BASE_URL, DEFAULT_FORM_STATE } from "../constants";
import { Fields } from "../types/form";
import LoadingScreen from "../components/loader";
import { LichessGameResponse } from "../types/response";
import axios from "axios";

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Fields>(DEFAULT_FORM_STATE);
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
      
      const response = await axios.get(url, {
        headers: {
          Accept: "application/x-ndjson",
        },
      });
      
      if (response.status !== 200) {
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
