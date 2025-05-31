import { Puzzle } from "../../../types/puzzle";

interface PuzzlePhaseIconProps {
  gamePhase: Puzzle["phase"];
}

const PuzzlePhaseIcon: React.FC<PuzzlePhaseIconProps> = ({ gamePhase }) => {
  return (
    <img
      src={`/phases/${gamePhase}.svg`}
      className="w-6 h-6 rounded-full bg-white"
      alt={gamePhase}
      title={`Position taken from ${gamePhase}`}
    />
  );
};

export default PuzzlePhaseIcon;
