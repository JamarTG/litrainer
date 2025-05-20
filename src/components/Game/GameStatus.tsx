import { FC } from "react";
import {  LichessPlayers } from "../../types/player";
import { getGameStatusDescription } from "../../utils/game";

interface GameStatusProps {
  status: string;
  winner: string | undefined;
  players: LichessPlayers;
  theme: "light" | "dark";
}

const GameStatus: FC<GameStatusProps> = ({ status, winner, players, theme }) => {
  return (
    <div className="flex justify-center items-center text-gray-500">
      <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-white"}`}>
        {getGameStatusDescription(status, winner === "white" ? players.white : players.black)}
      </p>
    </div>
  );
};

export default GameStatus;
