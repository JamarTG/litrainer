import React, { ChangeEvent } from "react";
import Dates from "./dates";
import usePopperDropDown from "../../../../../features/Board/hooks/usePopperDropDown";
import ReactDOM from "react-dom";

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ handleInputChange }) => {
  const timeDropdown = usePopperDropDown();

  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4">
        <Dates handleInputChange={handleInputChange} />
      </div>
    </div>
  );
};

export default SlideTwo;
