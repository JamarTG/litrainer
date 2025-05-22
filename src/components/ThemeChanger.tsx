import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/slices/themeSlices";
import useUpdateTheme from "../hooks/useUpdateTheme";

const ThemeChanger: FC = () => {

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useUpdateTheme(theme);
  
  return (

    //  <div
    //   style={{ width: "90%" }}
    //   className="pl-2  px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4 "
    // ></div>
    <button  style={{ width: "90%" }}
      className="pl-2  px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4 " onClick={() => dispatch(toggleTheme())}>
      {theme === "light" ? (
        <p>light</p>
      ) : (
        <p>dark</p>
      )}
    </button>
  );
};

export default ThemeChanger;