import { getEngineDepth, getEngineState } from "@/redux/slices/engine";
import stockfishPng from "../../../../public/sf.png";
import { useSelector } from "react-redux";
import { useEngineContext } from "@/context/hooks/useEngineContext";
import { EngineName } from "@/typing/enums";
import { Fragment } from "react/jsx-runtime";

const renderStockfishImage = (engineName: string) => {
  return <img src={stockfishPng} width={40} height={40} alt={engineName} />;
};

const renderStockfishInfo = (engineName: EngineName, engineDepth: number, isEngineRunning: boolean) => {
  return (
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
  );
};

const StockfishDetails = () => {
  const { engine } = useEngineContext();
  const engineName = engine?.getName();
  const isEngineRunning = useSelector(getEngineState);
  const engineDepth = useSelector(getEngineDepth);

  return (
    <div className="flex gap-1">
      <div className="flex flex-row gap-2 justify-center items-center text-xs">
        {renderStockfishImage(engineName as EngineName)}
        {renderStockfishInfo(engineName as EngineName, engineDepth, isEngineRunning)}
      </div>
    </div>
  );
};

export default StockfishDetails;
