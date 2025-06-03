import { getGameStatusDescription } from "@/utils/status";
import { Puzzle } from "@/types/puzzle";

interface GameStatusProps {
  gameStatus: Puzzle["status"];
  gameWinner: Puzzle["winner"];
  whitePlayer: Puzzle["players"]["white"];
  blackPlayer: Puzzle["players"]["black"];
}

const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, gameWinner, whitePlayer, blackPlayer }) => {
  const didWhiteWin = gameWinner === "white";
  return (
    <p className="text-md text-gray-400">
      {getGameStatusDescription(gameStatus, didWhiteWin ? whitePlayer : blackPlayer)}
    </p>
  );
};

export default GameStatus;
