import React from 'react';

interface GameInfoProps {
  gameId: string;
  clock: {
    initial: number;
    increment: number;
  };
  rated: boolean;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameId, clock, rated }) => {
  return (
    <div className="flex items-center space-x-4">
      <p className="noto">From Game</p>
      <a
        href={`https://lichess.org/${gameId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="noto flex items-center text-blue-500 text-sm"
      >
        <span className="icon text-2xl hover:text-blue-500 ml-1">&#xe07a;</span>
      </a>
      <p>
        {clock && (
          <>
            {clock.initial} + {clock.increment}
          </>
        )}
      </p>
      <p>{rated ? "Rated" : "Casual"}</p>
    </div>
  );
};

export default GameInfo;
