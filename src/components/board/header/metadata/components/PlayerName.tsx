import { LICHESS_URLS } from "@/constants/urls";
import { FC } from "react";

interface PlayerNameProps {
  name?: string;
}

const PlayerName: FC<PlayerNameProps> = ({ name }) =>
  name ? (
    <a
      href={`${LICHESS_URLS.Profile}/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline"
    >
      {name}
    </a>
  ) : null;

export default PlayerName;
