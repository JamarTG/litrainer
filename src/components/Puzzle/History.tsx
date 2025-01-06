import { Classification } from "../../types/move";

interface HistoryProps {
  history: (Classification | "")[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">History</h2>
      <div className="grid grid-cols-10">
        {history.map((item, index) => (
          <div key={index}>
            <img
              src={`/images/marker/${item || "Blank"}.svg`}
              alt={item}
              width={15}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
