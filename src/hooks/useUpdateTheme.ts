import { useEffect } from "react";
import { isDarkModeActive } from "@/redux/slices/theme";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useUpdateTheme = () => {
  const isDarkMode = useSelector((state: RootState) => {
    return isDarkModeActive(state.theme);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
};

export default useUpdateTheme;
