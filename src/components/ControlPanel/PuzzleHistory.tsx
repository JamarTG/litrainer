import { useState } from "react";

interface HistoryProps {
  history: Record<number, string | null>;
  puzzleIndex: number;
  jumpToPuzzle: (index: number) => void;
}

const ITEMS_PER_PAGE = 7; 

const History: React.FC<HistoryProps> = ({ history, puzzleIndex, jumpToPuzzle }) => {
  const entries = Object.entries(history);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);

  const start = page * ITEMS_PER_PAGE;
  const visibleEntries = entries.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
  
      <div className="flex justify-center">
        {visibleEntries.map(([key, value]) => {
          const index = parseInt(key);
          const isActive = index === puzzleIndex;

          return (
            <button
              key={key}
              onClick={() => jumpToPuzzle(index)}
              style={{
                margin: "4px",
                padding: "8px",
                border: isActive ? "2px solid blue" : "2px solid transparent", 
                borderRadius: "4px",
                cursor: "pointer",
              }}
              
            >
              <img
                src={`/assets/evals/${value || "Blank"}.svg`}
                alt={value || "Blank"}
                width={24}
                height={24}
              />
            </button>
          );
        })}
      </div>
      
      <div className="justify-center items-center text-sm" style={{ display: "flex", justifyContent: "space-between"}}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          style={{
            padding: "8px 16px",
            border: "1px solid gray",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <span>{`Page ${page + 1} of ${totalPages}`}</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          style={{
            padding: "8px 16px",
            border: "1px solid gray",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default History;