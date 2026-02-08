import { getEngineDepth, getEngineState } from "@/redux/slices/engine";
import stockfishPng from "/sf.png";
import { useSelector } from "react-redux";
import { useEngineContext } from "@/context/hooks/useEngineContext";

import { Fragment } from "react/jsx-runtime";


const StockfishDetails = () => {
  const { engine } = useEngineContext();
  const engineName = engine?.getName();
  const isEngineRunning = useSelector(getEngineState);
  const engineDepth = useSelector(getEngineDepth);

  return (
    <div className="flex gap-1">
      <div className="flex flex-row gap-2 justify-center items-center text-md">
        <img src={stockfishPng} width={40} height={40} alt={engineName} />
        <Fragment>
          {isEngineRunning ? (
            <p>evaluating move ...</p>
          ) : (
            <div className="flex flex-col justify-start">
              <p>{engineName}</p>
              <p>depth {engineDepth}</p>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default StockfishDetails;
