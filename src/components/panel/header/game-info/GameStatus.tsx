import { getGameStatusDescription } from "@/utils/status";
import { ColorLongForm, LichessPlayer } from "@/types/lichess";
import { isWhitePlayerLong } from "@/utils/color";

interface GameStatusProps {
  gameStatus: string;
  gameWinner: ColorLongForm;
  whitePlayer: LichessPlayer;
  blackPlayer: LichessPlayer;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, gameWinner, whitePlayer, blackPlayer }) => {
  const getWinner = (gameWinner: ColorLongForm) => {
    return isWhitePlayerLong(gameWinner) ? whitePlayer : blackPlayer;
  };

  return <p className="text-md text-gray-400">{getGameStatusDescription(gameStatus, getWinner(gameWinner))}</p>;
};

export default GameStatus;
