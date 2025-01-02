import React, { useRef, useState, useEffect, MouseEventHandler } from "react";
import ProgressIndicator from "./progressIndicator";
import NavigationButtons from "./navbuttons";


interface SwiperProps {
  children: React.ReactNode[];
  className?: string;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}

const Swiper: React.FC<SwiperProps> = ({ children, className , handleSubmit}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      scrollToSlide(currentIndex); // Re-align the slides on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) scrollToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < children.length - 1) scrollToSlide(currentIndex + 1);
  };

  return (
    <div className={`  ${className}`}>
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 overflow-hidden w-full"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0  w-full"
            style={{ width: "100%" }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className=" flex justify-between py-4 px-4 bg-secondary border-quaternary border-t rounded-es-lg rounded-ee-lg">
        <ProgressIndicator  children={children} currentIndex={currentIndex}  setCurrentIndex={setCurrentIndex}  scrollToSlide={scrollToSlide}/>

        <NavigationButtons
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentIndex={currentIndex}
          length={children.length}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Swiper;
