import { useRef, useState } from "react";

const dragToScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);

    setStartX(e.pageX - scrollContainerRef.current.offsetLeft); // Calculate initial cursor position relative to container

    setScrollLeft(scrollContainerRef.current.scrollLeft); // Store initial scroll position of container
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault(); // Prevent default behavior to enable smooth dragging

    const x = e.pageX - scrollContainerRef.current.offsetLeft; // Current cursor position relative to container

    const walk = (x - startX) * 1; // Calculate the distance moved by the cursor

    scrollContainerRef.current.scrollLeft = scrollLeft - walk; // Adjust scroll position based on cursor movement
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeft = () => {
    setIsDragging(false);
  };

  return {
    scrollContainerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeft,
  };
};

export default dragToScroll;
