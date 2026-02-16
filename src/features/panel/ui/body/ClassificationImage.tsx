import { CLASSIFICATION_IMAGES } from "@/constants/classification";
import { getClassification, getPlayedMove } from "@/state/slices/feedback";
import { getPuzzle } from "@/state/slices/puzzle";
import { Classification } from "@/typing/types";
import { MoveClassification } from "@/typing/enums";
import { useSelector } from "react-redux";

const FALLBACK_CLASSIFICATION_ALT = "move quality";
const INITIAL_CLASSIFICATION_IMG_SIZE = 54;
const FINAL_CLASSIFICATION_IMG_SIZE = 54;

const ClassificationImage = () => {
  const puzzle = useSelector(getPuzzle);
  const classification = useSelector(getClassification);
  const playedMove = useSelector(getPlayedMove);
  const initialImageSrc = CLASSIFICATION_IMAGES[puzzle.evaluation.judgment?.name as Classification];
  const initialImageAlt = puzzle.evaluation.judgment?.name ?? FALLBACK_CLASSIFICATION_ALT;

  const finalImageSrc = classification
    ? CLASSIFICATION_IMAGES[classification as keyof typeof MoveClassification]
    : initialImageSrc;
  const finalImageAlt = classification ?? initialImageAlt;

  const isAttempted = !!(playedMove && classification);


  return (
    <div className="w-14 h-14 self-center relative flex-shrink-0 flex items-center justify-center overflow-hidden">
      <img
        
        src={initialImageSrc}
        width={INITIAL_CLASSIFICATION_IMG_SIZE}
        height={INITIAL_CLASSIFICATION_IMG_SIZE}
        alt={initialImageAlt}
        className={`absolute inset-0 m-auto w-11 h-11 object-contain object-center transition-opacity duration-500 ease-in-out ${isAttempted ? "opacity-0" : "opacity-100"}`}
        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))" }}
      />
      <img
        src={finalImageSrc}
        width={FINAL_CLASSIFICATION_IMG_SIZE}
        height={FINAL_CLASSIFICATION_IMG_SIZE}
        alt={finalImageAlt}
        className={`absolute inset-0 m-auto w-11 h-11 object-contain object-center transition-opacity duration-500 ease-in-out ${isAttempted ? "opacity-100" : "opacity-0"}`}
        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.4))" }}
      />
    </div>
  );
};

export default ClassificationImage;
