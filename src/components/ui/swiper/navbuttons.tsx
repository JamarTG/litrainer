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
          className="bg-secondary  rounded-lg text-sm text-textwhite py-[10px] px-[16px] flex "
        >
          Go back
        </button>
      </div>
      <div>
        <button
          onClick={handleNext}
          disabled={currentIndex === length - 1}
          className="bg-accent rounded-lg text-sm text-textwhite  flex justify-center py-[10px] px-[16px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NavigationButtons;
