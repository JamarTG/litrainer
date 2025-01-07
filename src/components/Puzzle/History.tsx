interface HistoryProps {
  history: Record<number, string>;
  puzzleIndex: number;
  jumpToPuzzle: (index: number) => void;
}

const History: React.FC<HistoryProps> = ({ history, jumpToPuzzle}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">History</h2>
      <div className="grid grid-cols-10 gap-2">
        {Object.entries(history).map(([key, value]) => (
          <button
        key={key}
        onClick={() => jumpToPuzzle(parseInt(key))}
        className="p-1 rounded shadow-sm transition-transform transform hover:scale-105 cursor-pointer active:scale-95"
          >
        <img
          src={`/assets/evals/${value || "Blank"}.svg`}
          alt={value}
          width={20}
        />
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;
