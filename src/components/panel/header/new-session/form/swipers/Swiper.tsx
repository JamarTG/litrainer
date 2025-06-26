import { useRef, useEffect, MouseEventHandler, ReactNode, FC, Dispatch, SetStateAction, useCallback } from "react";
import ProgressIndicator from "./ProgressIndicator";
import NavigationButtons from "./Navbuttons";
import List from "@/components/common/List";

interface SwiperProps {
  children: ReactNode[];
  className?: string;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
}

const Swiper: FC<SwiperProps> = ({ children, className, handleSubmit, currentSlide, setCurrentSlide }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToSlide = useCallback(
    (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: index * containerRef.current.offsetWidth,
          behavior: "smooth"
        });
      }
      setCurrentSlide(index);
    },
    [setCurrentSlide]
  );

  useEffect(() => {
    const handleResize = () => {
      scrollToSlide(currentSlide);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide, scrollToSlide]);

  const handlePrev = () => {
    if (currentSlide > 0) scrollToSlide(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < children.length - 1) scrollToSlide(currentSlide + 1);
  };

  const renderChild = (child: ReactNode, index: number) => (
    <div
      key={index}
      className="flex-shrink-0 w-full"
      style={{ width: "100%", display: index === currentSlide ? "block" : "none" }}
    >
      {child}
    </div>
  );

  return (
    <div className={`  ${className}`}>
      <div ref={containerRef} className="flex transition-transform duration-300 overflow-hidden w-full">
        <List items={children} renderItem={renderChild} />
      </div>

      <div className=" flex justify-between py-4 px-4 bg-secondary border-quaternary border-t rounded-es-lg rounded-ee-lg">
        <ProgressIndicator
          children={children}
          currentIndex={currentSlide}
          setCurrentIndex={setCurrentSlide}
          scrollToSlide={scrollToSlide}
        />

        <NavigationButtons
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentIndex={currentSlide}
          length={children.length}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Swiper;
