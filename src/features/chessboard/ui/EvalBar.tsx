import { getPuzzle } from "@/state/slices/puzzle";
import { getEvaluationCp, getEvaluationMate } from "@/state/slices/feedback";
import { useSelector } from "react-redux";

interface EvalBarProps {
  orientation: "vertical" | "horizontal";
  className?: string;
}

const CP_CLAMP = 600;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const toWhiteShare = (cp: number | null, mate: number | null) => {
  if (mate !== null) {
    return mate > 0 ? 100 : 0;
  }

  if (cp === null) {
    return 50;
  }

  const normalized = clamp(cp / CP_CLAMP, -1, 1);
  return 50 + normalized * 50;
};

const formatEvalLabel = (cp: number | null, mate: number | null) => {
  if (mate !== null) {
    return `M${mate > 0 ? `+${mate}` : mate}`;
  }

  if (cp === null) {
    return "--";
  }

  const pawns = (cp / 100).toFixed(1);
  const sign = cp > 0 ? "+" : "";
  return `${sign}${pawns}`;
};

const EvalBar: React.FC<EvalBarProps> = ({ orientation, className = "" }) => {
  const puzzle = useSelector(getPuzzle);
  const evaluationCp = useSelector(getEvaluationCp);
  const evaluationMate = useSelector(getEvaluationMate);

  const currentMate = evaluationMate;
  const currentCp = evaluationCp ?? (currentMate === null ? puzzle?.evaluation.eval ?? null : null);

  const whiteShare = toWhiteShare(currentCp, currentMate);
  const evalLabel = formatEvalLabel(currentCp, currentMate);

  if (orientation === "vertical") {
    return (
      <div className={`hidden md:flex w-12 shrink-0 flex-col items-center gap-2 ${className}`}>
        <div className="relative h-full min-h-[360px] w-4 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
          <div
            style={{ height: `${whiteShare}%` }}
            className="absolute bottom-0 left-0 w-full bg-[var(--color-fg)] transition-[height] duration-700 ease-in-out"
          />
        </div>
        <span className="w-full text-center text-[10px] font-semibold text-[var(--color-muted)] tabular-nums">{evalLabel}</span>
      </div>
    );
  }

  return (
    <div className={`md:hidden w-full ${className}`}>
      <div className="mb-1 grid grid-cols-[1fr_auto_1fr] items-center text-[10px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        <span>Black</span>
        <span className="w-14 text-center tabular-nums">{evalLabel}</span>
        <span className="text-right">White</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
        <div
          style={{ width: `${whiteShare}%` }}
          className="absolute right-0 top-0 h-full bg-[var(--color-fg)] transition-[width] duration-700 ease-in-out"
        />
      </div>
    </div>
  );
};

export default EvalBar;
