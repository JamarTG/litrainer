import React from 'react';

interface PlayerNameProps {
  name: string;
}

const PlayerName: React.FC<PlayerNameProps> = ({ name }) => {
  return (
    <a
      className="text-blue-500 text-sm md:text-base ml-1"
      href={`https://lichess.org/@/${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
};

export default PlayerName;