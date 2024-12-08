import { FormEvent, useState } from "react";
import { API_BASE_URL, INITIAL_FORM_STATE } from "../constants";
import { Models } from "../typings";
import { extractErrors } from "../utils/processing/extractErrors";
import TrainerForm from "../components/home/TrainerForm";
import combineEvalAndMisplays from "../utils/processing/combineEvalAndMisplays";
import Trainer from "./Trainer";

const Home = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [puzzles, setPuzzles] = useState<Models.Move.Info[][]>([]);

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
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

    setFormSubmitted(true);

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
        parsedPuzzleData.misplayInfo as Models.Game.LichessGameInfo[],
        parsedPuzzleData.moveEvaluations
      );

      console.log(puzzles)

      setPuzzles(puzzles);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <div>
      {formData.username &&
      formData.maxNoGames &&
      formData.startDate &&
      formData.endDate &&
      formSubmitted ? (
        <Trainer puzzles={puzzles} />
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
