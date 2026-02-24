import { LICHESS_URLS } from "@/constants/urls";
import { FC } from "react";

interface PlayerNameProps {
  name?: string;
}

const PlayerName: FC<PlayerNameProps> = ({ name }) => {
  if (!name) return null;

  // Capitalize first letter, lowercase the rest
  const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <a
      href={`${LICHESS_URLS.Profile}/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {displayName}
    </a>
  );
};

export default PlayerName;
