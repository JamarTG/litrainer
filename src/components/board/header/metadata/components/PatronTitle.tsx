import { FC } from "react";

interface PlayerTitleProps {
  title?: string;
}

const PlayerTitle: FC<PlayerTitleProps> = ({ title }) => (title ? <p className="text-orange-400">{title}</p> : null);

export default PlayerTitle;
