import { FC } from "react";

interface RatingDifferenceProps {
  ratingDiff?: number;
}

const RatingDifference: FC<RatingDifferenceProps> = ({ ratingDiff }) => {
  if (!ratingDiff) return;

  const getDiffTextColor = (diff: number) =>
    diff > 0 ? "text-green-500" : diff < 0 ? "text-red-500" : "text-gray-500";
  const getRatingDiffWithOperator = (diff: number) => (diff > 0 ? `+${diff}` : diff);

  const diffTextColor = getDiffTextColor(ratingDiff);
  const ratingDifference = getRatingDiffWithOperator(ratingDiff);

  return <span className={diffTextColor}>{ratingDifference}</span>;
};

export default RatingDifference;
