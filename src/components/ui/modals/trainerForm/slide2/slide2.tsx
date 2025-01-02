import React, { ChangeEvent, useState } from "react";
import Dates from "./dates"; // Assuming Dates component is implemented elsewhere

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ handleInputChange }) => {


  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4">
        {/* Dates Component */}
        <Dates handleInputChange={handleInputChange} />

      </div>
    </div>
  );
};

export default SlideTwo;
