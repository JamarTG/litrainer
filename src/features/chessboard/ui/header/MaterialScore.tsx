interface MaterialScoreProps {
  score: number | null;
}

const MaterialScore: React.FC<MaterialScoreProps> = ({ score }) => {
  if (!score) return;

  const shouldAddPlus = score > 0;

  return (
    <div className="flex items-center justify-center text-[13px] font-semibold">
      <span className="text-gray-600 dark:text-gray-300">{shouldAddPlus && "+"}</span>
      <span className="text-gray-800 dark:text-gray-200">{score}</span>
    </div>
  );
};

export default MaterialScore;
