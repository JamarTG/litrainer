import { FC, MouseEventHandler, MouseEvent } from "react";
import Button from "@/components/shared/Button";

interface NavigationButtonsProps {
  handlePrev: () => void;
  handleNext: () => void;
  currentIndex: number;
  length: number;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({
  handlePrev,
  handleNext,
  currentIndex,
  length,
  handleSubmit
}) => {
  const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentIndex === length - 1) {
      handleSubmit(event);
    } else {
      handleNext();
    }
  };

  return (
    <div className="flex justify-end gap-2.5">
      <Button onClick={handlePrev} disabled={currentIndex === 0} className="px-3 py-1.5 text-sm font-medium rounded-md">
        Go back
      </Button>

      <Button onClick={submitHandler} className="px-3 py-1.5 text-sm font-medium rounded-md">
        {currentIndex === length - 1 ? "Submit" : "Continue"}
      </Button>
    </div>
  );
};

export default NavigationButtons;
