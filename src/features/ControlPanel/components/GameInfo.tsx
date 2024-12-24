import React, { Fragment } from "react";
import { timeControlIcons } from "../../../constants";
import { formatTime } from "../../../utils/time";

interface GameInfoProps {
  gameId: string;
  clock: {
    initial: number;
    increment: number;
  };
  rated: boolean;
  timeControl: string;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameId, clock, rated, timeControl }) => {
  return (
    <div className="flex items-center space-x-4 mb-10">
      <div className="flex justify-center items-center gap-1 text-bold ">
        <span
          className="icon text-4xl hover:text-blue-500"
          dangerouslySetInnerHTML={{
            __html: timeControlIcons[timeControl],
          }}
        ></span>

        <p>{(rated ? "Rated" : "Casual").toLocaleUpperCase()}</p>

        <p>{"• " + timeControl.toLocaleUpperCase()}</p>

        <p>
          {clock && (
            <Fragment>
              {"• " + formatTime(clock.initial)}+{formatTime(clock.increment)}
            </Fragment>
          )}
        </p>
      </div>

      <div className="flex justify-center items-center">
        <a
          href={`https://lichess.org/${gameId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="noto flex gap-1 items-center justify-center text-blue-500 "
        >
          <span className="icon text-xl hover:text-blue-500 ml-1">
            &#xe07a;
          </span>
          <small> View on Lichess</small>
        </a>
      </div>
    </div>
  );
};

export default GameInfo;
