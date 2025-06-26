import { FC } from "react";

interface RatingDifferenceProps {
  ratingDiff?: number;
}

const RatingDifference: FC<RatingDifferenceProps> = ({ ratingDiff }) => {
  if (!ratingDiff) return <p> </p>;
  const getDiffClass = (diff: number) => (diff > 0 ? "text-green-500" : diff < 0 ? "text-red-500" : "text-gray-500");
  const getRatingDiffWithOperator = (diff: number) => (diff > 0 ? `+${diff}` : diff);

  const diffClass = getDiffClass(ratingDiff);
  const ratingDiffWithOperator = getRatingDiffWithOperator(ratingDiff);

  return (
    <p>
      <span className={diffClass}>{ratingDiffWithOperator}</span>
    </p>
  );
};

export default RatingDifference;
