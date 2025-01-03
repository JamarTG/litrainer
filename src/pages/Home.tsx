import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL, INITIAL_FORM_STATE } from "../constants";
import { Fields } from "../types/form";
import { LichessGameResponse } from "../types/response";
import createPuzzles, { parseLichessResponse } from "../utils/lichess";
import TrainerForm from "../components/ui/Modals/TrainerForm";
import SubmitButtonWithModal from "../features/Form/components/SubmitButtomWithModal";

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let { username, maxNoGames, startDate, endDate, gameTypes, color, sort } =
      formData;

    if (!username) {
      alert("Please provide a username");
      return;
    }

    if (gameTypes.length < 1) {
      alert("Please select at least one game type");
      return;
    }

    if (!maxNoGames) {
      maxNoGames = 10;
    }

    if (!sort) {
      sort = "desc";
    }

    if (!color) {
      color = "both";
    }

    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    if (!startDate) {
      startDate = lastWeek.toISOString().split("T")[0];
    }
    if (!endDate) {
      endDate = now.toISOString().split("T")[0];
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (start > end) {
      alert("Start date must be before end date.");
      return;
    }

    console.log("sort", sort);
    try {
      const gameTypesQuery = gameTypes
        .map((type) => `perfType=${type}`)
        .join("&");

      const url = `${API_BASE_URL}games/user/${username}?since=${start.getTime()}&until=${end.getTime()}&max=${maxNoGames}&sort=dateAsc&color=${color}&${gameTypesQuery}&evals=true&analysed=true`;
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
        return;
      }

      const puzzles = createPuzzles(
        username,
        parsedPuzzleData.games as LichessGameResponse[],
        parsedPuzzleData.evaluations
      );

      if (puzzles.length === 0) {
        alert("No games found for the given criteria");
        return;
      } else {
        alert(`Fetched ${puzzles.length} games`);
      }

      navigate("/train", { state: { puzzles } });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <div className="bg-gray-700 flex flex-col justify-center min-h-screen p-4 gap-3 items-center">
      <div className="w-1/2 text-white text-xl p-4 text-center">
        This application is still under construction. Some functionalities have
        not been implement. Use the default parameters on the button above to
        access the Playground.
      </div>
      <SubmitButtonWithModal
        text="Try the Trainer ❤️"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
