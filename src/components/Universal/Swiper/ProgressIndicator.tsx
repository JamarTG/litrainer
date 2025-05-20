import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface ProgressIndicatorProps {
  children: ReactNode[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  scrollToSlide: (index: number) => void;
}

const ProgressIndicator: FC<ProgressIndicatorProps> = ({
  children,
  currentIndex,
  setCurrentIndex,
  scrollToSlide,
}) => {
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    scrollToSlide(index);
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="flex space-x-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`transition-all duration-300 ease-in-out ${
              index === currentIndex
                ? "w-8 h-2 bg-accent rounded-full" // Pill for the active indicator
                : "w-2 h-2 bg-[#ffffff12]  rounded-full" // Dot for inactive indicators
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
