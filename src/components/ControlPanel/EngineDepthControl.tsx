import { useDepth } from "../../context/hooks/useDepth";

const EngineDepthControl = () => {
  const { depth, setDepth } = useDepth(); 

  return (
    <div className="p-6 rounded-lg">
      <div className="flex gap-2 items-center space-x-4">
        <input
          type="range"
          min="1"
          max="20"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-700 accent-teal-400"
          style={{
            WebkitAppearance: "none",
            appearance: "none",
            height: "6px",
            borderRadius: "999px",
            background:
              "linear-gradient(to right, rgba(45, 212, 191, 1) 0%, rgba(45, 212, 191, 0.7) 100%)",
            outline: "none",
            transition: "background 0.15s ease-in-out",
          }}
        />
        {depth}
      </div>
      <p className="mt-3 text-sm">
        Adjust the depth of the chess engine analysis.
      </p>
    </div>
  );
};

export default EngineDepthControl;
