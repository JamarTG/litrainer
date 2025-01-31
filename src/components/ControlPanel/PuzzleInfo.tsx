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
    <div className="flex gap-2 w-full">
      {!(feedback && classification) && (
        <img
          src={`/assets/evals/${puzzle.evaluation.judgment?.name}.svg`}
          alt={puzzle.evaluation.judgment?.name}
          width={40}
        />
      )}
      <p className="text-lg flex flex-col">
        {feedback && classification ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              {classification != "Best" && (
                <div className="flex gap-2">
                  <img
                    src={`/assets/evals/${classification}.svg`}
                    alt={classification}
                    width={20}
                  />
                  <p>{feedback.played}</p>
                </div>
              )}
              <div className="flex gap-2">
                <img
                  src={`/assets/evals/Best.svg`}
                  alt={puzzle.evaluation.judgment?.name}
                  width={20}
                />
                <p>{feedback.best}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>{puzzle.userMove.san} was played here.</p>
            <small>Find a better move</small>
          </div>
        )}
      </p>
    </div>
  );
};

export default PuzzleInfo;
