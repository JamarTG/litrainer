import { useContext } from "react";
import { getGameResultMessage } from "../../utils/chess";
import { PuzzleContext } from "../../context/PuzzleContext";



const GameResultMessage: React.FC = () => {
  
  const {puzzle} = useContext(PuzzleContext);

  return (
    <p>
      {puzzle && getGameResultMessage(
        puzzle.status,
        // Undefined if draw, irrelevant since no winner
        puzzle.winner == "white"
          ? puzzle.players.white.user.name
          : puzzle.players.black.user.name
      )}
    </p>
  );
};

export default GameResultMessage;
