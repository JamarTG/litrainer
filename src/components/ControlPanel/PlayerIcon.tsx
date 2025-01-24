

import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface PlayerIconProps {
  color: "white" | "black";
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color }) => {
  const { theme } = useContext(ThemeContext);

  const iconColor = theme === 'light' ? (color === 'white' ? 'black' : 'white') : color;

  return (
    <div className="rounded-full px-1">
      {iconColor === "white" ? (
        <span className="icon text-xl">&#xe028;</span>
      ) : (
        <span className="icon text-xl">&#xe029;</span>
      )}
    </div>
  );
};

export default PlayerIcon;
