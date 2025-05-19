import { Classification } from "../../types/classification";
import { Puzzle } from "../../types/puzzle";

interface PuzzleInfoProps {
  puzzle: Puzzle;
  feedback: { best: string | null; played: string | null };
  classification: Classification | null;
}

const PuzzleInfo: React.FC<PuzzleInfoProps> = ({ puzzle, feedback, classification }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md md:w-[400px] flex flex-col gap-2 p-5">
      <div className="flex justify-center items-center gap-4 w-full max-w-md ">
        <img
          src={
            feedback && classification
              ? `/assets/app-icons/move-quality/${classification}.svg`
              : `/assets/app-icons/move-quality/${puzzle.evaluation.judgment?.name}.svg`
          }
          alt={feedback && classification ? classification : puzzle.evaluation.judgment?.name}
          width={40}
          height={40}
          className="flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="text-lg truncate">
            {feedback.played && classification ? (
              <div>
                <p>{feedback.played}</p>
                <small>{feedback.best}</small>
              </div>
            ) : (
              <div>
                <p>{puzzle.userMove.san} was played here.</p>
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
