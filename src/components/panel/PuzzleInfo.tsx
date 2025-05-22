import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MoveClassificationImages, MoveClassification } from "../../constants/classification";

const PuzzleInfo = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const { classification, playedMove, bestMove } = useSelector((state: RootState) => state.feedback);

  if (!puzzle) return null;

  const imageSrc = classification
    ? MoveClassificationImages[classification as keyof typeof MoveClassification]
    : MoveClassificationImages[puzzle.evaluation.judgment?.name as keyof typeof MoveClassification];

  const imageAlt = classification ?? puzzle.evaluation.judgment?.name ?? "move quality";

  return (
    <div
      style={{ width: "90%" }}
      className="pl-2  px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="ml-3 w-10 h-10 sm:w-12 sm:h-12 object-contain"
      />

      <div className="flex-1 text-center sm:text-left">
        {playedMove && classification ? (
          <>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              <span className="text-purple-900">{playedMove}</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{bestMove}</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-base sm:text-lg text-gray-800">{puzzle.userMove?.san || "A move"} was played.</p>
            <p className="text-sm text-gray-600">Try to find a better move.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PuzzleInfo;
