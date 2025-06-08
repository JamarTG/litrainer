import { useState, useEffect } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const intervalId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return loading;
};

export default useLoading;
