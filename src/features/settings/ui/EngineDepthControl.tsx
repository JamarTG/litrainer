import { getEngineDepth, setDepth } from "@/state/slices/engine";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const MIN_ALLOWABLE_ENGINE_DEPTH = 8;
const MAX_ALLOWABLE_ENGINE_DEPTH = 18;

const EngineDepthControl = () => {
  const dispatch = useDispatch();
  const depth = useSelector(getEngineDepth);

  const adjustEngineDepthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDepth(Number(e.target.value)));
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)] p-3.5 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-2">
        <label htmlFor="engine-depth" className="text-base font-medium text-[var(--color-fg)]">
          Engine Depth
        </label>
        <span className="text-sm text-[var(--color-muted)] w-8 text-right">{depth}</span>
      </div>

      <div className="w-full rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1 shadow-inner">
        <input
          id="engine-depth"
          type="range"
          min={MIN_ALLOWABLE_ENGINE_DEPTH}
          max={MAX_ALLOWABLE_ENGINE_DEPTH}
          value={depth}
          onChange={(e) => adjustEngineDepthHandler(e)}
          className="w-full accent-[var(--color-primary)] bg-transparent"
        />
      </div>
      <div className="mt-1 space-y-0.5">
        <small className="block text-xs text-[var(--color-muted)]">Using Stockfish 17 Lite (single-thread)</small>
        <small className="block text-xs text-[var(--color-muted)]">Higher depth means slower evaluation.</small>
      </div>
    </div>
  );
};

export default EngineDepthControl;