import GameSpeed from "./GameSpeed";
import GameStatus from "./GameStatus";
import GameOpening from "./GameOpening";
import GameLink from "./GameLink";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const GameInfo = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];

  const theme = useSelector((state: RootState) => state.theme.theme);

  if (!puzzle) return null;

  return (
    <div
      style={{ width: "90%" }}
      className="pl-2 px-4 sm:px-0 mx-auto rounded-lg border px-10 flex-col items-center justify-center gap-4"
    >
      <div className="flex items-center justify-between">
        <GameSpeed
          timeControl={puzzle.timeControl}
          rated={puzzle.rated}
          clock={puzzle.clock}
        />
        <GameLink
          gameId={puzzle.gameId}
          moveNo={puzzle.moveNumber}
        />
      </div>

      <GameStatus
        status={puzzle.status}
        winner={puzzle.winner}
        players={puzzle.players}
        theme={theme}
      />

      <hr className="border-gray-400 m-2" />

      <GameOpening
        eco={puzzle.opening.eco}
        name={puzzle.opening.name}
      />
    </div>
  );
};

export default GameInfo;
