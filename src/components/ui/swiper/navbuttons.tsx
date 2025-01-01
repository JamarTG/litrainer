import React from "react";

interface NavigationButtonsProps {
  handlePrev: () => void;
  handleNext: () => void;
  currentIndex: number;
  length: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  handlePrev,
  handleNext,
  currentIndex,
  length,
}) => {
  return (
    <div className={` flex justify-end gap-4 text-offWhite `}>
      <div>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-[#ffffff12]  rounded-lg text-sm text-cloudGray h-[32px]  px-3 max-w-fit flex justify-center items-center hover:text-offWhite cursor-pointer transition-all ease-in-out"
        >
          Go back
        </button>
      </div>
      <div>
        <button
          onClick={handleNext}
          disabled={currentIndex === length - 1}
          className="bg-accent rounded-lg text-sm text-textwhite  flex justify-center items-center h-[32px] px-3 max-w-fit "
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NavigationButtons;
