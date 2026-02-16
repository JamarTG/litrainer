import { getBestMove, getClassification, getPlayedMove, hasAttempted } from "@/state/slices/feedback";
import { getPuzzle } from "@/state/slices/puzzle";
import { useSelector } from "react-redux";

const ClassificationText = () => {
  const puzzle = useSelector(getPuzzle);
  const playedMove = useSelector(getPlayedMove);
  const isPuzzleAttempted = useSelector(hasAttempted);
  const bestMove = useSelector(getBestMove);
  const classification = useSelector(getClassification);

  const playedMoveText = playedMove ?? puzzle.userMove?.san ?? "--";
  const bestMoveText = isPuzzleAttempted ? bestMove ?? "--" : "--";
  const statusText = isPuzzleAttempted
    ? classification ?? "Pending"
    : puzzle.evaluation.judgment?.name ?? "Pending";
  const headerText = isPuzzleAttempted ? "Move Feedback" : "Error in Game";
  const playedMoveLabel = isPuzzleAttempted ? "Your Move" : "Error";

  return (
    <div className="flex flex-col flex-1 min-w-0 gap-3 h-full justify-start">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{headerText}</span>
        <span className="text-xs uppercase tracking-wide text-[var(--color-muted)] font-semibold min-w-[90px] text-right">
          {statusText}
        </span>
      </div>

      <div className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-1.5 items-center text-sm leading-5">
        <span className="text-[var(--color-muted)] font-semibold">{playedMoveLabel}</span>
        <span className="text-[var(--color-fg)] font-semibold truncate">{playedMoveText}</span>

        <span className="text-[var(--color-muted)] font-semibold">Best Move</span>
        <span className="text-[var(--color-fg)] truncate">{bestMoveText}</span>
      </div>
    </div>
  );
};

export default ClassificationText;
