import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chess, Square } from "chess.js";
import { PIECE_ICONS } from "../../constants";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  OffIcon: JSX.Element,
  type: "Hint" | "Solution";
  bestMove?: string;
  game: Chess;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled,
  onToggle,

  OffIcon,
  type,
  bestMove,
  game,
}) => {
  if (!bestMove) {
    return;
  }
  const pieceType = game.get(bestMove.substring(0, 2) as Square)?.type;

  return (
    <button
      onClick={onToggle}
      className="transition duration-200 relative"
    >
      <span
        className={`transition-opacity duration-500 ${
          isToggled ? "opacity-0" : "opacity-100"
        }`}
      >
        {OffIcon}
      </span>

      {isToggled && type === "Solution" && bestMove && (
        <span className="absolute transition-opacity duration-500 opacity-100">
          <FontAwesomeIcon icon={PIECE_ICONS[pieceType]} />
        </span>
      )}
      {isToggled && type === "Hint" && bestMove && (
        <span className="absolute transition-opacity duration-500 opacity-100">
          {bestMove}
        </span>
      )}
    </button>
  );
};

export default ToggleButton;
