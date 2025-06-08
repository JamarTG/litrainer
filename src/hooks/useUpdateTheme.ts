import { useEffect } from "react";
import { isDarkModeActive } from "@/redux/slices/theme";
import { useSelector } from "react-redux";

const useUpdateTheme = () => {
  const isDarkMode = useSelector(isDarkModeActive);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
};

export default useUpdateTheme;
