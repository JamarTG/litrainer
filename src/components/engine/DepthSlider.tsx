import { useState } from "react";

const DepthSlider = () => {
  const [depth, setDepth] = useState(0);
  return (
    <div className="flex">
      <input
        onChange={(e) => setDepth(parseInt(e.target.value))}
        id="minmax-range"
        type="range"
        min="0"
        max="20"
        value={depth}
        className="w-64 h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default DepthSlider;
