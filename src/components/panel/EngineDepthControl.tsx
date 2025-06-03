import { EngineDepth } from "../../constants/engine";
import { useDepth } from "../../context/hooks/useDepth";
// import "../../styles/slider.css"; // import the custom slider CSS

const EngineDepthControl = () => {
  const { depth, setDepth } = useDepth();

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-4">
        <label htmlFor="engine-depth" className="whitespace-nowrap">
          engine depth
        </label>
        <input
          id="engine-depth"
          type="range"
          min={EngineDepth.Min}
          max={EngineDepth.Max}
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="custom-slider flex-1"
        />
        <span className="text-sm text-gray-300 w-6 text-right">{depth}</span>
      </div>
    </div>
  );
};

export default EngineDepthControl;
