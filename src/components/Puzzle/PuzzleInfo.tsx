import { useSelector } from "react-redux";
import { RootState } from "../../pages/redux/store";

const PuzzleInfo = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const classification = useSelector((state: RootState) => state.feedback.classification);
  const feedback = useSelector((state: RootState) => state.feedback);

  if (!puzzle) return null;

  return (
    <div className="border border-gray-200 rounded-lg shadow-md md:w-[400px] flex flex-col gap-2 p-5">
      <div className="flex justify-center items-center gap-4 w-full max-w-md">
        <img
          src={
            feedback && classification
              ? `/assets/app-icons/move-quality/${classification}.svg`
              : `/assets/app-icons/move-quality/${puzzle.evaluation.judgment?.name}.svg`
          }
          alt={
            feedback && classification
              ? classification
              : puzzle.evaluation.judgment?.name || "move quality"
          }
          width={40}
          height={40}
          className="flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="text-lg truncate">
            {feedback.playedMove && classification ? (
              <div>
                <p>{feedback.playedMove}</p>
                <small>{feedback.bestMove}</small>
              </div>
            ) : (
              <div>
                <p>{puzzle.userMove?.san || "A move"} was played here.</p>
                <small>Find a better move</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleInfo;

