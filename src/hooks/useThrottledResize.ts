import { useEffect, useState } from "react";

const useThrottledResize = <T>(calculateValue: () => T, delay: number = 200): T => {
  const [value, setValue] = useState<T>(() => calculateValue());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setValue(calculateValue());
        timeoutId = null;
      }, delay);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateValue, delay]);

  return value;
};

export default useThrottledResize;
