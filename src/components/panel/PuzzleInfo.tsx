import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { MoveClassificationImages, MoveClassification } from "../../constants/classification";

const PuzzleInfo = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const { classification, playedMove, bestMove } = useSelector((state: RootState) => state.feedback);

  if (!puzzle) return null;

  // const imageSrc = classification
  //   ? MoveClassificationImages[classification as keyof typeof MoveClassification]
  //   : MoveClassificationImages[puzzle.evaluation.judgment?.name as keyof typeof MoveClassification];

  // const imageAlt = classification ?? puzzle.evaluation.judgment?.name ?? "move quality";

  return (
    <div
      className="border border-gray-300 dark:border-transparent w-full flex sm:flex-row items-center justify-center sm:items-start"
    >

      <div className="flex-1 text-center flex justify-center items-center sm:text-left h-[50px]">
        {playedMove && classification ? (
            <div className="flex flex-row justify-center items-center h-full xl:justify-center xl:items-center xl:flex-col gap-2">
            <small className="text-sm text-gray-800">
              <span className="text-xl font-bold">{playedMove}</span>
              {classification && (
              <span className="ml-2 text-base font-semibold text-purple-900">
                ({classification})
              </span>
              )}
            </small>
            <p className="hidden xs:inline text-gray-600">
              Best move: <span className="font-medium">{bestMove}</span>
            </p>
            </div>
        ) : (
          <div className="flex flex-row justify-center items-center h-full xl:justify-center xl:items-center xl:flex-col gap-2">
            <small className="text-sm text-gray-800 dark:text-white">
              <span className="text-xl font-bold">{puzzle.userMove?.san || "A move"}?!</span>
             
            </small>
            <p className="hidden xs:inline text-gray-600">Try to find a better move.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleInfo;
