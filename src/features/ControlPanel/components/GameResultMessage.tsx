import React from "react";
import { getGameResultMessage } from "../../../utils/chess";
import { Puzzle } from "../../../types/puzzle";

interface GameResultMessageProps {
  puzzle: Puzzle;
}

const GameResultMessage: React.FC<GameResultMessageProps> = ({ puzzle }) => {
  return (
    <p>
      {getGameResultMessage(
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
