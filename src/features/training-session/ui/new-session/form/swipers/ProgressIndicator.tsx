import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface ProgressIndicatorProps {
  children: ReactNode[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  scrollToSlide: (index: number) => void;
}

const ProgressIndicator: FC<ProgressIndicatorProps> = ({ children, currentIndex, setCurrentIndex, scrollToSlide }) => {
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    scrollToSlide(index);
  };

  const renderChild = (_: ReactNode, index: number) => (
    <button
      key={index}
      onClick={() => handleIndicatorClick(index)}
      className={`transition-all duration-300 ease-in-out ${
        index === currentIndex
          ? "w-8 h-2 bg-[var(--color-fg)] rounded-full"
          : "w-2 h-2 bg-[var(--color-border)] rounded-full"
      }`}
    />
  );
  return (
    <div className=" flex justify-center items-center ">
      <div className="flex space-x-2">{children.map(renderChild)}</div>
    </div>
  );
};

export default ProgressIndicator;
