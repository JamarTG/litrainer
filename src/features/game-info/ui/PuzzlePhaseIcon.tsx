import { Puzzle } from "@/typing/interfaces";

interface PuzzlePhaseIconProps {
  gamePhase: Puzzle["phase"];
}

const PuzzlePhaseIcon: React.FC<PuzzlePhaseIconProps> = ({ gamePhase }) => {
  const phaseLabel = gamePhase.toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <img
        src={`/phases/${gamePhase}.svg`}
        alt={`${gamePhase} icon`}
        title={`Position taken from ${gamePhase}`}
        className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 p-0.5"
      />
      <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200 tracking-wide">
        {phaseLabel}
      </span>
    </div>
  );
};

export default PuzzlePhaseIcon;