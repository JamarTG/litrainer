import React from "react";
import { LichessURL } from "../../../constants/urls";
import { Puzzle } from "../../../types/puzzle";

interface ViewGameProps {
  gameId: Puzzle["gameId"];
  moveNumber: Puzzle["moveNumber"];
}

const ViewGame: React.FC<ViewGameProps> = ({ gameId, moveNumber }) => {
  return (
    <a
      href={`${LichessURL.Base}${gameId}#${moveNumber}`}
      className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition mr-2"
      target="_blank"
      rel="noopener noreferrer"
      title="View game on Lichess"
    >
      
      <span>View Game on Lichess.org</span>
    </a>
  );
};

export default ViewGame;
