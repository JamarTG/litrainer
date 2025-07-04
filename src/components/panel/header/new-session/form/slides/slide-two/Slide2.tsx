import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import Dates from "./Dates";
import { Fields } from "@/typing/interfaces";

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<Fields>>;
  formData: Fields;
}

const SlideTwo: FC<SlideTwoProps> = ({ handleInputChange, formData, setFormData }) => {
  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4">
        <Dates handleInputChange={handleInputChange} setFormData={setFormData} formData={formData} />
      </div>
    </div>
  );
};

export default SlideTwo;
