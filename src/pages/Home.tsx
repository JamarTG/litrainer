import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL, INITIAL_FORM_STATE } from "../constants";
import { Fields } from "../types/form";
// import LoadingScreen from "../components/loader";
import { LichessGameResponse } from "../types/response";
import createPuzzles, { parseLichessResponse } from "../utils/lichess";
import TrainerForm from "../components/ui/Modals/TrainerForm/TrainerForm";

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

    console.log("sort",sort)
    try {
      const gameTypesQuery = gameTypes.map(type => `perfType=${type}`).join("&");
      
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
    <div className="">
      <button
        onClick={handleToggleModal}
        className=" whitespace-nowrap h-fit w-full items-center justify-center rounded-lg  text-white shadow-xs px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[3])-1px)]   cursor-pointer bg-accent transition duration-150 hover:border-accent text-sm "
      >
        Submit
      </button>
      {isModalOpen && (
        <TrainerForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Home;
