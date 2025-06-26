interface MaterialScoreProps {
  score: number | null;
}

const MaterialScore: React.FC<MaterialScoreProps> = ({ score }) => {
  if (!score) return;

  const operator = score > 0 && "+";
  return (
    <div className="flex items-center justify-center text-xs">
      <span className="text-gray-600 dark:text-gray-300">{operator}</span>
      <span className="text-gray-800 dark:text-gray-200">{score}</span>
    </div>
  );
};

export default MaterialScore;
