import { ENGINE_DEPTH_MAX, ENGINE_DEPTH_MIN, ENGINE_SLIDER_STYLE } from "../../constants/engine";
import { useDepth } from "../../context/hooks/useDepth";

const EngineDepthControl = () => {
  const { depth, setDepth } = useDepth(); 

  return (
    <div className="w-2/5">
      <div >
        <input
          type="range"
          min={ENGINE_DEPTH_MIN}
          max={ENGINE_DEPTH_MAX}
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-700 accent-teal-400"
          style={ENGINE_SLIDER_STYLE}
        />
        {depth}
      </div>
      <p className="mt-3 text-md w-full">
        Adjust the depth of the chess engine analysis.
      </p>
    </div>
  );
};

export default EngineDepthControl;
