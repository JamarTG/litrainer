import React from "react";

interface GameInfoProps {
  gameId: string;
  clock: {
    initial: number;
    increment: number;
  };
  rated: boolean;
}

const formatTime = (seconds: number): string => {
  if (seconds === 30) {
    return "1/2";
  }
  if (seconds === 15) {
    return "1/4";
  }
  if (seconds < 60) {
    return `${seconds}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}`;
  }

  return `${minutes}${formatTime(remainingSeconds).replace("0.", ".")}`;
};

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

      <p>{rated ? "Rated" : "Casual"}</p>
      <p>
        {clock && (
          <>
            {formatTime(clock.initial)} + {formatTime(clock.increment)}
          </>
        )}
      </p>
    </div>
  );
};

export default GameInfo;
