import { getEngineDepth, getEngineState } from "@/state/slices/engine";

import { useSelector } from "react-redux";
import { useEngineContext } from "@/features/analysis-engine";
import { Fragment } from "react/jsx-runtime";


const EngineDetails = () => {
  const { engine } = useEngineContext();
  const engineName = engine?.getName();
  const isEngineRunning = useSelector(getEngineState);
  const engineDepth = useSelector(getEngineDepth);

  return (
    <div className="min-h-6 min-w-[220px]">
      <div className="flex items-center text-sm leading-6">
        <Fragment>
          <p className={`${isEngineRunning ? "opacity-100" : "opacity-0 absolute pointer-events-none"}`}>evaluating move...</p>
          <div className={`flex items-center gap-2 ${isEngineRunning ? "opacity-0 absolute pointer-events-none" : "opacity-100"}`}>
            <span className="font-semibold truncate max-w-[150px]">{engineName}</span>
            <span className="text-[var(--color-muted)] whitespace-nowrap">depth {engineDepth}</span>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default EngineDetails;
