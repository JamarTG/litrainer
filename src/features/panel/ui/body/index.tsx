import NavigatePuzzle from "./NavigatePuzzle";
import ClassificationText from "./ClassificationText";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/typing/enums";
import { getPuzzle } from "@/state/slices/puzzle";
import { getClassification, getPlayedMove } from "@/state/slices/feedback";
import { useSelector } from "react-redux";
import { NewSessionTriggerButton } from "@/features/training-session";

const PanelBody = () => {
  const puzzle = useSelector(getPuzzle);
  const playedMove = useSelector(getPlayedMove);
  const classification = useSelector(getClassification);

  if (!puzzle) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center p-4 gap-6 min-h-48 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No puzzle data available :(</p>
        <NewSessionTriggerButton />
      </div>
    );
  }

  const hasPlayedMove = !!playedMove || !!puzzle.userMove;
  const mobileMoveLabel = hasPlayedMove
    ? (classification ?? puzzle.evaluation.judgment?.name ?? "Blunder")
    : "Severity";
  const mobileMoveValue = playedMove ?? puzzle.userMove?.san ?? "--";
  const mobileClassification = classification ?? puzzle.evaluation.judgment?.name ?? MoveClassification.inaccuracy;
  function normalizeClassificationKey(key: unknown): MoveClassification {
    if (!key) return MoveClassification.inaccuracy;
    const str = String(key).toLowerCase();
    if (Object.values(MoveClassification).includes(str as MoveClassification)) {
      return str as MoveClassification;
    }
    return MoveClassification.inaccuracy;
  }
  const mobileClassificationKey = normalizeClassificationKey(mobileClassification);
  const mobileClassificationIcon = CLASSIFICATION_IMAGES[mobileClassificationKey];

  return (
    <div className="flex flex-col flex-1 justify-start items-center md:justify-center px-4 pb-4 pt-1 md:p-4 gap-3 md:gap-6 min-h-48 rounded-lg">
      <div className="order-1 md:order-2 w-full max-w-md min-h-[48px] flex items-center">
        <NavigatePuzzle />
      </div>

      <div className="order-2 md:hidden w-full max-w-md border border-[var(--color-border)] rounded-md px-3 py-2 bg-[var(--color-surface)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <img src={mobileClassificationIcon} alt={mobileMoveLabel} className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] truncate">{mobileMoveLabel}</span>
        </div>
        <span className="text-sm font-semibold text-[var(--color-fg)] truncate">{mobileMoveValue}</span>
      </div>

      <div className="order-3 md:order-1 hidden md:flex items-stretch gap-3 w-full max-w-md min-h-[120px] border border-[var(--color-border)] rounded-md p-4 bg-white dark:bg-[var(--color-surface)]">
        <ClassificationText />
      </div>
    </div>
  );
};

export default PanelBody;
