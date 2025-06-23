import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { getClassification, getPlayedMove } from "@/redux/slices/feedback";
import { getPuzzle } from "@/redux/slices/puzzle";
import { Classification } from "@/types/classification";
import { MoveClassification } from "@/utils/enums";
import { useSelector } from "react-redux";

const ClassificationImage = () => {
  const puzzle = useSelector(getPuzzle);
  const classification = useSelector(getClassification);
  const playedMove = useSelector(getPlayedMove);
  const initialImageSrc = CLASSIFICATION_IMAGES[puzzle.evaluation.judgment?.name as Classification];
  const initialImageAlt = puzzle.evaluation.judgment?.name ?? "move quality";

  const finalImageSrc = classification
    ? CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]
    : initialImageSrc;
  const finalImageAlt = classification ?? initialImageAlt;

  const isAttempted = !!(playedMove && classification);

  return (
    <div className="w-12 h-12 relative flex-shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700 shadow-inner flex items-center justify-center overflow-hidden">
      <img
        src={initialImageSrc}
        width={54}
        height={54}
        alt={initialImageAlt}
        className={`absolute transition-opacity duration-500 ease-in-out ${isAttempted ? "opacity-0" : "opacity-100"}`}
        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))" }}
      />
      <img
        src={finalImageSrc}
        width={48}
        height={48}
        alt={finalImageAlt}
        className={`absolute transition-opacity duration-500 ease-in-out ${isAttempted ? "opacity-100" : "opacity-0"}`}
        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.4))" }}
      />
    </div>
  );
};

export default ClassificationImage;
