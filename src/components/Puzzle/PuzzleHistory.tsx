import { useState, useEffect } from "react";

interface HistoryProps {
  history: Record<number, string | null>;
  puzzleIndex: number;
  jumpToPuzzle: (index: number) => void;
}

const ITEMS_PER_PAGE = 7;

const History: React.FC<HistoryProps> = ({
  history,
  puzzleIndex,
  jumpToPuzzle,
}) => {
  const entries = Object.entries(history);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);

  // Calculate the page that contains the active puzzle
  useEffect(() => {
    const activePage = Math.floor(puzzleIndex / ITEMS_PER_PAGE);
    setPage(activePage);
  }, [puzzleIndex]);

  const start = page * ITEMS_PER_PAGE;
  const visibleEntries = entries.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex w-96 items-center gap-2 m-5 justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"
            ></path>
          </svg>
        </button>
        {visibleEntries.map(([key, value]) => {
          const index = parseInt(key);
          const isActive = index === puzzleIndex;

          return (
            <button
              key={key}
              onClick={() => jumpToPuzzle(index)}
              className="font-bold flex justify-center items-center text-white w-8 h-5 rounded-lg"
            >
              <img
                src={`/assets/app-icons/move-quality/${isActive  ? "Current" : value ? value : "Blank"}.svg`}
                width={20}
                alt=""
              />
            </button>
          );
        })}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="1em"
            height="1em"
          >
            <path
              fill="currentColor"
              d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex justify-center items-center text-sm">
        <span>{`Page ${page + 1} of ${totalPages}`}</span>
      </div>
    </div>
  );
};

export default History;