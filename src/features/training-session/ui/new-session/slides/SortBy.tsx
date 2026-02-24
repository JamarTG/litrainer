import { Sort } from "@/typing/types";

const SortBy = ({ onSortOptionSelect }: { onSortOptionSelect: (option: Sort) => void }) => {
  return (
    <div className="bg-[var(--color-surface)] w-[128px] rounded-lg border border-[var(--color-border)] px-2 py-2 shadow-sm">
      <div className="flex flex-col text-xs text-[var(--color-fg)] space-y-0">
        <button
          className="hover:bg-[var(--color-surface-hover)] hover:rounded-md py-2 px-2 flex gap-x-2 transition-colors"
          onClick={() => onSortOptionSelect("asc")}
        >
          <div>
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h7m-7 6h7m-7 6h9m2-9 3-3 3 3m-3-3v12" />
            </svg>
          </div>
          <p>Ascending</p>
        </button>
        <button
          className="hover:bg-[var(--color-surface-hover)] hover:rounded-md py-2 px-2 flex gap-x-2 transition-colors"
          onClick={() => onSortOptionSelect("desc")}
        >
          <div>
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h9m-9 6h7m-7 6h7m4-3 3 3 3-3m-3-9v12" />
            </svg>
          </div>
          <p>Descending</p>
        </button>
      </div>
    </div>
  );
};

export default SortBy;
