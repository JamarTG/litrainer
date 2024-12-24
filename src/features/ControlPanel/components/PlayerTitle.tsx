import React from "react";

interface PlayerTitleProps {
  title: string | null;
}

const PlayerTitle: React.FC<PlayerTitleProps> = ({ title }) => {
  return (
    <>
      {title && (
        <p className="text-orange-400 text-sm ml-1 md:text-base">{title}</p>
      )}
    </>
  );
};

export default PlayerTitle;
