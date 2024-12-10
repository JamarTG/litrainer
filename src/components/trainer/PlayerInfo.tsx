import React from 'react';
import { Models } from '../../typings';

interface PlayerInfoProps {
  player: Models.Player.ChessPlayerInfo
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  const { user, rating } = player;
  return (
    <div className="noto player-color flex items-center gap-1">
      <p className="w-8">
        {user.patron && (
            <small className="icon text-orange-500 text-2xl ml-1 cursor-pointer">
            &#xe06c;
            </small>
        )}
      </p>
      <p className="text-orange-400">
        {user.title && (
          <p>
            {user.title}
          </p>
        )}
      </p>
      <p className='flex justify-center items-center gap-1'>
        {user.name}
        {user.flair && (
          <img
            src={`https://lichess1.org/assets/______2/flair/img/${user.flair}.webp`}
            alt="flair"
            className="w-4 h-4 ml-1"
          />
        )}
      </p>
      ({rating})
    </div>
  );
};

export default PlayerInfo;