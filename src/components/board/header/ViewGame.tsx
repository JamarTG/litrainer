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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="m21.91 13.43-4.73-8.59.61-2.59c.01-.06 0-.13-.05-.18-.04-.05-.11-.07-.17-.07-1.42.17-2.6.36-3.75 1.19-4.04-.27-7.27.75-9.35 2.95-2.18 2.31-2.67 5.46-2.39 7.63.64 4.71 4.33 7.19 7.57 7.94.83.19 1.64.28 2.44.28 2.79 0 5.25-1.15 6.62-3.21.06-.09.04-.2-.04-.27a.19.19 0 0 0-.27.02c-2.84 2.94-7.5 3.44-11.08 1.2-3.74-2.34-5.17-7.01-3.26-10.62 1.9-3.6 5.29-5.15 9.53-4.36.05 0 .1 0 .14-.02l.28-.16c.77-.46 1.63-.96 2.39-1.07l-.58 1.66c-.02.06-.01.12.02.17l5.07 8.49c-.16 1.69-1.42 2.09-1.85 2.18-.24-.54-.68-1.14-1.92-2.34-.35-.34-1.01-.78-1.77-1.3-1.97-1.33-4.95-3.35-4.49-4.99a.2.2 0 0 0-.14-.25.2.2 0 0 0-.25.14c-.67 2.32 2.35 4.65 4.35 6.19.54.42 1.01.78 1.33 1.08 1.45 1.37 2.14 2.38 2.28 2.65.04.08.14.13.23.1.04-.01 3.94-1.08 3.28-3.81 0-.02-.01-.03-.02-.05Z"
          className="b"
        ></path>
      </svg>
      <span>View Game on Lichess.org</span>
    </a>
  );
};

export default ViewGame;
