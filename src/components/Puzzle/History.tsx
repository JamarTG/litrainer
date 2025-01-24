interface HistoryProps {
  history: Record<number, string>;
  puzzleIndex: number;
  jumpToPuzzle: (index: number) => void;
}

const History: React.FC<HistoryProps> = ({ history, jumpToPuzzle }) => {
  return (
    <div>
      <div className="grid grid-cols-10 grid-rows-5 m-4 h-48 overflow-y-scroll overflow-x-hidden justify-start items-start" ref={el => { if (el) el.scrollTop = el.scrollHeight; }}>
        {Object.entries(history).map(([key, value]) => (
          <button
            key={key}
            onClick={() => jumpToPuzzle(parseInt(key))}
            className="p-1 m-1 rounded transition-transform transform hover:scale-105 cursor-pointer active:scale-95"
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
