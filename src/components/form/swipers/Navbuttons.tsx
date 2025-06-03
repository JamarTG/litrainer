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
    <div className={` flex justify-end gap-4 text-offWhite `}>
      <Button onClick={handlePrev} disabled={currentIndex === 0} variant="primary">
        Go back
      </Button>

      <Button onClick={submitHandler} variant="secondary">
        {currentIndex === length - 1 ? <>Submit</> : <>Continue</>}
      </Button>
    </div>
  );
};

export default NavigationButtons;
