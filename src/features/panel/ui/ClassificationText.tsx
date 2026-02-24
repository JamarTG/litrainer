import {  getClassification, getPlayedMove, hasAttempted } from "@/state/slices/feedback";
import { getPuzzle } from "@/state/slices/puzzle";
import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { MoveClassification } from "@/typing/enums";
import { useSelector } from "react-redux";

const ClassificationText = () => {
  const puzzle = useSelector(getPuzzle);
  const playedMove = useSelector(getPlayedMove);
  const isPuzzleAttempted = useSelector(hasAttempted);
  const classification = useSelector(getClassification);
  const playedMoveText = playedMove ?? puzzle.userMove?.san ?? "--";

  const normalizeClassificationKey = (key: unknown): MoveClassification => {
    if (!key) return MoveClassification.inaccuracy;
    const str = String(key).toLowerCase();
    return Object.values(MoveClassification).includes(str as MoveClassification)
      ? (str as MoveClassification)
      : MoveClassification.inaccuracy;
  };

  const playedMoveKey = normalizeClassificationKey(
    isPuzzleAttempted ? classification : puzzle.evaluation.judgment?.name
  );
  const playedMoveIcon = CLASSIFICATION_IMAGES[playedMoveKey];

  return (
    <div className="flex flex-col w-full min-w-0 h-full justify-center items-center">
        <div className="flex w-full items-center justify-start">
          <img
            src={playedMoveIcon}
            alt={playedMoveKey}
            className="w-16 h-16 inline-block align-middle"
            style={{ marginLeft: 2 }}
          />
          <div className="flex flex-col items-start p-4">
            <p className="text-lg font-semibold text-[var(--color-fg)]">
              {playedMoveText || ""}
              {!isPuzzleAttempted && playedMoveText ? " was played here" : ""}
            </p>
            {isPuzzleAttempted
              ? (
                  [MoveClassification.correct, MoveClassification.good, MoveClassification.excellent, MoveClassification.best, MoveClassification.great].includes(playedMoveKey)
                    ? <p className="text-green-600">Move accepted!</p>
                    : <p>Try another move :)</p>
                )
              : <p>Find a better move</p>
            }
          </div>
        </div>


    </div>
  );
};

export default ClassificationText;

