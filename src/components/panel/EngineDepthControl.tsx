import { EngineDepth } from "../../constants/engine";
import { useDepth } from "../../context/hooks/useDepth";

const EngineDepthControl = () => {
  const { depth, setDepth } = useDepth();

  return (
    <div className="w-2/5">
      <div>
        <input
          type="range"
          min={EngineDepth.Min}
          max={EngineDepth.Max}
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-700 accent-teal-400"
          style={{
            WebkitAppearance: "none",
            appearance: "none",
            height: "6px",
            borderRadius: "999px",
            background: "linear-gradient(to right, rgba(45, 212, 191, 1) 0%, rgba(45, 212, 191, 0.7) 100%)",
            outline: "none",
            transition: "background 0.15s ease-in-out",
          }}
        />
        {depth}
      </div>
      <p className="mt-3 text-md w-full">Adjust the depth of the chess engine analysis.</p>
    </div>
  );
};

export default EngineDepthControl;
