import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MoveClassificationImages, MoveClassification } from "../../constants/classification";
import Navigation from "./Navigation";

const PuzzleInfo = () => {
  const { classification, playedMove, bestMove, puzzle } = useSelector((state: RootState) => {
    return { ...state.feedback, puzzle: state.puzzle.puzzles[state.puzzle.currentIndex] };
  });

  if (!puzzle) return null;

  const imageSrc = classification
    ? MoveClassificationImages[classification as keyof typeof MoveClassification]
    : MoveClassificationImages[puzzle.evaluation.judgment?.name as keyof typeof MoveClassification];

  const imageAlt = classification ?? puzzle.evaluation.judgment?.name ?? "move quality";

  return (
    <div className="flex flex-col h-96 justify-start items-center sm:justify-center p-2 gap-4">
      {playedMove && classification ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src={imageSrc}
              width={40}
              alt={imageAlt}
            />
            <div className="flex flex-col items-start justify-center text-sm text-gray-800 dark:text-white">
              <small className="text-sm text-gray-800">
                <span className="text-xl">{playedMove}</span>
              </small>
              <p className="text-gray-600 text-lg">{bestMove}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col items-start justify-center text-sm text-gray-800 dark:text-white">
                <span className="text-xl font-bold">
                  {" "}
                  You played <span className="text-2xl font-bold">{puzzle.userMove?.san}</span>
                </span>
                <p className="text-gray-600 text-lg">Try to find a better move</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default PuzzleInfo;
