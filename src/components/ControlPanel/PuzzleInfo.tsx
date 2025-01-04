import { Puzzle } from "../../types/puzzle";

interface PuzzleInfoProps {
  puzzle: Puzzle
}

const PuzzleInfo: React.FC<PuzzleInfoProps> = ({ puzzle }) => {
  return (
    <div className="flex gap-2 w-full">
      <img
        src={`/images/marker/${puzzle.evaluation.judgment?.name}.svg`}
        alt={puzzle.evaluation.judgment?.name}
        width={40}
      />
      <p className="text-lg flex flex-col">
        <p>{puzzle.userMove.san} was played here.</p>

        <small>Find a better move</small>
      </p>
    </div>
  );
};

export default PuzzleInfo;
