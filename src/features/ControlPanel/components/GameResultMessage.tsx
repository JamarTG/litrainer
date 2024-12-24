import React from "react";
import { getGameResultMessage } from "../../../utils/chess";
import { LichessPlayers } from "../../../types/player";

interface GameResultMessageProps {
  status: string;
  winner?: string;
  players: LichessPlayers;
}

const GameResultMessage: React.FC<GameResultMessageProps> = ({
  status,
  winner,
  players,
}) => {
  return (
    <p>
      {getGameResultMessage(
        status,
        // Undefined if draw, irrelevant since no winner
        winner == "white" ? players.white.user.name : players.black.user.name
      )}
    </p>
  );
};

export default GameResultMessage;
