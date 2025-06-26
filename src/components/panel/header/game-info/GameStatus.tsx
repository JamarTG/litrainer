import { getGameStatusDescription } from "@/libs/trainer/text";
import { ColorLongForm } from "@/typing/enums";
import { LichessPlayer } from "@/typing/interfaces";

interface GameStatusProps {
  gameStatus: string;
  gameWinner: ColorLongForm;
  whitePlayer: LichessPlayer;
  blackPlayer: LichessPlayer;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, gameWinner, whitePlayer, blackPlayer }) => {
  const getWinner = (gameWinner: ColorLongForm) => {
    return gameWinner === ColorLongForm.WHITE ? whitePlayer : blackPlayer;
  };

  return <p className="text-md text-gray-400">{getGameStatusDescription(gameStatus, getWinner(gameWinner))}</p>;
};

export default GameStatus;
