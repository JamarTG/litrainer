import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import Dates from "./dates";
import { Fields } from "../../../../../types/form";

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData : Dispatch<SetStateAction<Fields>>;
  formData: Fields;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ handleInputChange, formData, setFormData }) => {
  
  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4">
        <Dates handleInputChange={handleInputChange} setFormData={setFormData} formData={formData} /> 
      </div>
    </div>
  );
};

export default SlideTwo;
