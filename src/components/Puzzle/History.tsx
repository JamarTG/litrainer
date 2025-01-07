interface HistoryProps {
  history: Record<number, string>;
  puzzleIndex : number
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">History</h2>
      <div className="grid grid-cols-10 gap-2">
        {Object.entries(history).map(([key, value]) => (
          <div key={key}>
            <img
              src={`/assets/evals/${value || "Blank"}.svg`}
              alt={value}
              width={15}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
