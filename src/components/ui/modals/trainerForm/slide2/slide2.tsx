import React, { ChangeEvent, useState } from "react";
import Dates from "./dates";  // Assuming Dates component is implemented elsewhere

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ handleInputChange }) => {
  const [minAccuracy, setMinAccuracy] = useState(20);  // Default min value
  const [maxAccuracy, setMaxAccuracy] = useState(80);  // Default max value

  // Handler for the min slider change
  const handleMinSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinValue = parseInt(e.target.value);
    if (newMinValue < maxAccuracy) {
      setMinAccuracy(newMinValue);
    }
    handleInputChange(e);  // Maintain consistency with other inputs
  };

  // Handler for the max slider change
  const handleMaxSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = parseInt(e.target.value);
    if (newMaxValue > minAccuracy) {
      setMaxAccuracy(newMaxValue);
    }
    handleInputChange(e);  // Maintain consistency with other inputs
  };

  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4">
        {/* Dates Component */}
        <Dates handleInputChange={handleInputChange} />
      </div>

      {/* Dual Accuracy Range Slider */}
      <div className="flex flex-col items-center">
        <label htmlFor="accuracy-slider" className="mb-2 text-sm text-offWhite">
          Accuracy Range: {minAccuracy}% - {maxAccuracy}%
        </label>

        {/* Dual Range Slider with Min and Max Labels */}
        <div className="relative w-full">
          {/* Max value slider */}
          <input
            id="max-accuracy-slider"
            type="range"
            min="0"
            max="100"
            value={maxAccuracy}
            onChange={handleMaxSliderChange}
            className="absolute w-full h-2 bg-gray-300 rounded-full cursor-pointer z-10"
          />

          {/* Min value slider */}
          <input
            id="min-accuracy-slider"
            type="range"
            min="0"
            max="100"
            value={minAccuracy}
            onChange={handleMinSliderChange}
            className="absolute w-full h-2 bg-gray-300 rounded-full cursor-pointer z-0"
          />

          {/* Range labels */}
          <div className="flex w-full items-center justify-between text-xs text-offWhite">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTwo;
