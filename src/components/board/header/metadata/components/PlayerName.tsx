import { LICHESS_URLS } from "@/constants/urls";
import { FC } from "react";

interface PlayerNameProps {
  name?: string;
}

const PlayerName: FC<PlayerNameProps> = ({ name }) => {
  if (!name) return null;

  return (
    <a
      href={`${LICHESS_URLS.Profile}/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {name}
    </a>
  );
};

export default PlayerName;
