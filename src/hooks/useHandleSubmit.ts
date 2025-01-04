import { useNavigate } from 'react-router-dom';
import createPuzzles, { parseLichessResponse } from '../utils/lichess';
import { LichessGameResponse } from '../types/response';



const API_BASE_URL = 'https://lichess.org/api/'; // Adjust the base URL as needed

const useHandleSubmit = (formData: any, setFormData: (data: any) => void) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let { username, maxNoGames, startDate, endDate, gameTypes, color, sort } = formData;

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

    try {
      const gameTypesQuery = gameTypes
        .map((type: string) => `perfType=${type}`)
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

      setFormData({}); // Reset form data
      navigate("/train", { state: { puzzles } });
      window.location.reload();
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return handleSubmit;
};

export default useHandleSubmit;