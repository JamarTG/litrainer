import { useState } from "react";
import { DEPTH_SLIDER_DEFAULT, DEPTH_SLIDER_MAX, DEPTH_SLIDER_MIN, DEPTH_SLIDER_WIDTH } from "../../constants/engine";

const DepthSlider = () => {
  const [depth, setDepth] = useState<number>(DEPTH_SLIDER_DEFAULT);
  return (
    <div className="flex">
      <input
        onChange={(e) => setDepth(parseInt(e.target.value))}
        id="minmax-range"
        type="range"
        min={DEPTH_SLIDER_MIN}
        max={DEPTH_SLIDER_MAX}
        value={depth}
        className={`${DEPTH_SLIDER_WIDTH} h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer`}
      />
    </div>
  );
};

export default DepthSlider;
