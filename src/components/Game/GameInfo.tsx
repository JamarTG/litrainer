import { useContext } from "react";
import GameSpeed from "./GameSpeed";
import GameStatus from "./GameStatus";
import GameOpening from "./GameOpening";
import GameLink from "./GameLink";
import { ThemeContext } from "../../context/ThemeContext";
import { PuzzleContext } from "../../context/PuzzleContext";

const GameInfo = () => {
  const { puzzle } = useContext(PuzzleContext);
  const { theme } = useContext(ThemeContext);

  if (!puzzle) return null;

  return (
    <div className="border border-gray-200 rounded-lg shadow-md md:w-[400px] flex flex-col gap-2 p-5">
      <div className="flex items-center justify-between">
        <GameSpeed timeControl={puzzle.timeControl} rated={puzzle.rated} clock={puzzle.clock} />
        <GameLink gameId={puzzle.gameId} moveNo={puzzle.moveNumber} />
      </div>

      <GameStatus status={puzzle.status} winner={puzzle.winner} players={puzzle.players} theme={theme} />

      <hr className="border-gray-400 m-2" />

      <GameOpening eco={puzzle.opening.eco} name={puzzle.opening.name} />
    </div>
  );
};

export default GameInfo;
