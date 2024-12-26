import { LichessEvaluation } from "../../../types/eval";
import { Move } from "../../../types/move";

interface PuzzleInfoProps {
  evaluation: LichessEvaluation;
  userMove: Move;
}

const PuzzleInfo: React.FC<PuzzleInfoProps> = ({ evaluation, userMove }) => {
  return (
    <div className="flex gap-2 w-full">
      <img
        src={`/images/marker/${evaluation.judgment?.name}.svg`}
        alt={evaluation.judgment?.name}
        width={40}
      />
      <p className="text-lg flex flex-col">
        <p>{userMove.san} was played here.</p>

        <small>Find a better move</small>
      </p>
    </div>
  );
};

export default PuzzleInfo;
