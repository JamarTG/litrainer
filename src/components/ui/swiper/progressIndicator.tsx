import React from "react";

interface ProgressIndicatorProps {
  children: React.ReactNode[];
  currentIndex: number;

}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
 children,
 currentIndex,

}) => {
  return (
<div className=" flex justify-center items-center ">
  {/* Progress Indicators */}
  <div className="flex space-x-2">
    {children.map((_, index) => (
      <button
        key={index}
        className={`transition-all duration-300 ease-in-out ${
          index === currentIndex
            ? 'w-8 h-2 bg-accent rounded-full' // Pill for the active indicator
            : 'w-2 h-2 bg-[#ffffff12]  rounded-full' // Dot for inactive indicators
        }`}
      />
    ))}
  </div>
</div>
  );
};

export default ProgressIndicator;
