import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { toggleAutoSkip } from "@/state/slices/puzzle";
import { RootState } from "@/state/store";

const AutoSkip = () => {
  const autoSkipOn = useSelector((state: RootState) => state.puzzle.autoSkip);
  const dispatch = useDispatch();
  const handleToggleSwitch = () => {
    dispatch(toggleAutoSkip());
  };

  return (
    <div className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] p-3 flex items-center justify-between gap-3">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-fg)]">Auto Skip</h3>
        <p className="text-xs text-[var(--color-muted)]">Go to the next puzzle after a solved attempt.</p>
      </div>
      <div className="shrink-0">
        <ToggleSwitch handleToggleSwitch={handleToggleSwitch} isOn={autoSkipOn} />
      </div>
    </div>
  );
};

export default AutoSkip;