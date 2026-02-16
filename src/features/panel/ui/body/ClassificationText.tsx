import { getBestMove, getClassification, getPlayedMove, hasAttempted } from "@/state/slices/feedback";
import { useSelector } from "react-redux";

const ClassificationText = () => {
  const playedMove = useSelector(getPlayedMove);
  const isPuzzleAttempted = useSelector(hasAttempted);
  const bestMove = useSelector(getBestMove);
  const classification = useSelector(getClassification);

  const playedMoveText = isPuzzleAttempted ? playedMove ?? "--" : "—";
  const bestMoveText = isPuzzleAttempted ? bestMove ?? "--" : "Play a move";
  const statusText = classification ?? "Pending";

  return (
    <div className="flex flex-col flex-1 min-w-0 gap-3 h-full justify-start">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Move Feedback</span>
        <span className="text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-semibold min-w-[90px] text-center">
          {statusText}
        </span>
      </div>

      <div className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-1.5 items-center text-sm leading-5">
        <span className="text-[var(--color-muted)] font-semibold">Your Move</span>
        <span className="text-[var(--color-fg)] font-semibold truncate">{playedMoveText}</span>

        <span className="text-[var(--color-muted)] font-semibold">Best Move</span>
        <span className="text-[var(--color-fg)] truncate">{bestMoveText}</span>
      </div>
    </div>
  );
};

export default ClassificationText;
