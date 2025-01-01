import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerForm from "../components/ui/modals/trainerForm/TrainerForm";
import { API_BASE_URL, INITIAL_FORM_STATE } from "../constants";
import { Fields } from "../types/form";
// import LoadingScreen from "../components/loader";
import { LichessGameResponse } from "../types/response";
import createPuzzles, { parseLichessResponse } from "../utils/lichess";


const Home: React.FC = () => {
  const [formData, setFormData] = useState<Fields>(INITIAL_FORM_STATE);
  // const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

      const parsedPuzzleData = await parseLichessResponse(response);

      if (!parsedPuzzleData) {
        // setLoading(false)
        return;
      }

      const puzzles = createPuzzles(
        username,
        parsedPuzzleData.games as LichessGameResponse[],
        parsedPuzzleData.evaluations
      );

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