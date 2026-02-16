import { FC } from "react";

interface PlayerTitleProps {
  title?: string;
}

const PlayerTitle: FC<PlayerTitleProps> = ({ title }) => {
  return <>{title ? <p className="text-orange-400">{title}</p> : null}</>;
};

export default PlayerTitle;
