import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setBoardTheme } from "../../redux/slices/boardThemeSlices";
import { BOARD_THEME_THUMBNAILS, BOARD_THEMES } from "../../constants/boardTheme";

const BoardThemeChooser = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const boardTheme = useSelector((state: RootState) => state.boardTheme.board);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (boardTheme: string) => {
    dispatch(setBoardTheme(boardTheme));
  };

  return (
    <div
      style={{ width: "90%" }}
      className="pl-2 px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4"
    >
      <button
        onClick={toggleDropdown}
        className="w-24 flex justify-center items-center rounded-md flex gap-2"
      >
        {BOARD_THEME_THUMBNAILS[boardTheme] ? (
          <img
            className="w-8 h-4"
            src={BOARD_THEME_THUMBNAILS[boardTheme]}
          />
        ) : (
          <div className="w-8 h-4"></div>
        )}
        {boardTheme || "Select Board Theme"}
        <span className="ml-2"> </span>
      </button>

      {isOpen && (
        <ul className="absolute dark:bg-[#2c2c2c] dark:text-white mt-8 p-2 w-64 h-48 overflow-y-auto bg-white border rounded shadow-lg z-10">
          {BOARD_THEMES.map((boardTheme) => (
            <li
              onClick={() => handleSelect(boardTheme.name)}
              key={boardTheme.name}
              className="cursor-pointer dark:hover:bg-[#000] w-full hover:bg-gray-100 px-4 py-2 flex justify-start items-center gap-2"
            >
              {boardTheme.thumbnail ? (
                <img
                  src={boardTheme.thumbnail}
                  className="w-8 h-4"
                  alt={boardTheme.name}
                />
              ) : (
                <div className="w-8 h-4"></div>
              )}

              <p>{boardTheme.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardThemeChooser;
