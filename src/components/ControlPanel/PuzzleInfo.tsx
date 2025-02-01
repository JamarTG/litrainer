import { Classification } from "../../types/move";
import { Puzzle } from "../../types/puzzle";

interface PuzzleInfoProps {
  puzzle: Puzzle;
  feedback: { best: string | null; played: string | null };
  classification: Classification | null;
}

const PuzzleInfo: React.FC<PuzzleInfoProps> = ({
  puzzle,
  feedback,
  classification,
}) => {
  return (
    <div className="my-5 h-16 flex items-start justify-center">
      <div className="flex justify-center items-center gap-4 w-full max-w-md ">
        <img
          src={
            feedback && classification
              ? `/assets/evals/${classification}.svg`
              : `/assets/evals/${puzzle.evaluation.judgment?.name}.svg`
          }
          alt={
            feedback && classification
              ? classification
              : puzzle.evaluation.judgment?.name
          }
          width={40}
          height={40}
          className="flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="text-lg truncate">
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default PuzzleInfo;
