import { getEngineDepth, setDepth } from "@/state/slices/engine";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const MIN_ALLOWABLE_ENGINE_DEPTH = 8;
const MAX_ALLOWABLE_ENGINE_DEPTH = 25;

const EngineDepthControl = () => {
  const dispatch = useDispatch();
  const depth = useSelector(getEngineDepth);

  const adjustEngineDepthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDepth(Number(e.target.value)));
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-4">
        <label htmlFor="engine-depth" className="whitespace-nowrap">
          engine depth
        </label>

        <input
          id="engine-depth"
          type="range"
          min={MIN_ALLOWABLE_ENGINE_DEPTH}
          max={MAX_ALLOWABLE_ENGINE_DEPTH}
          value={depth}
          onChange={(e) => adjustEngineDepthHandler(e)}
          className="custom-slider flex-1"
        />
        <span className="text-sm dark:text-zinc-600 w-6 text-right">{depth}</span>
      </div>
      <small className="text-red-500">higher depth = slower eval</small>
    </div>
  );
};

export default EngineDepthControl;