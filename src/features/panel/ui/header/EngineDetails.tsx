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
    <div className="flex gap-1">
      <div className="flex flex-row gap-2 justify-center items-center text-md">
        <Fragment>
          {isEngineRunning ? (
            <p>evaluating move ...</p>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{engineName}</span>
              <span className="text-gray-500">depth {engineDepth}</span>
            </div>

          )}
        </Fragment>
      </div>
    </div>
  );
};

export default EngineDetails;
