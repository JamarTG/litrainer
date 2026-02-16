import { Puzzle } from "@/typing/interfaces";
import { Activity, BookOpen, Flag, LucideIcon } from "lucide-react";

interface PuzzlePhaseIconProps {
  gamePhase: Puzzle["phase"];
}

const PHASE_ICONS: Record<Puzzle["phase"], LucideIcon> = {
  opening: BookOpen,
  middlegame: Activity,
  endgame: Flag
};

const PuzzlePhaseIcon: React.FC<PuzzlePhaseIconProps> = ({ gamePhase }) => {
  const phaseLabel = gamePhase.toUpperCase();
  const PhaseIcon = PHASE_ICONS[gamePhase] ?? BookOpen;

  return (
    <div className="flex items-center gap-2">
      <div
        title={`Position taken from ${gamePhase}`}
        className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 p-0.5 flex items-center justify-center"
      >
        <PhaseIcon size={14} className="text-zinc-700 dark:text-zinc-200" aria-hidden />
      </div>
      <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200 tracking-wide">
        {phaseLabel}
      </span>
    </div>
  );
};

export default PuzzlePhaseIcon;